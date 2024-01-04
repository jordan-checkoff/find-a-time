import { useForm, SubmitHandler } from "react-hook-form"
import { CreateEventFormDataInterface } from "../../interfaces/EventFormInterface"
import EventForm from "./EventForm"
import { useNavigate } from 'react-router-dom';
import { createEvent } from "../../utils/api_calls";
import dayjs from "dayjs";


export default function EventFormController() {

    const { control, handleSubmit } = useForm<CreateEventFormDataInterface>({
        defaultValues: {
          title: "",
          dates: [],
          timezone: dayjs.tz.guess(),
          starttime: null,
          endtime: null
        },
      })


      
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<CreateEventFormDataInterface> = async (data) => {
        const starttime = data.starttime
        const endtime = data.endtime
    
        if (starttime && endtime) {
            const start_times = data.dates.map(x => x.hour(starttime.hour()).startOf('hour').valueOf())
            let num_blocks = (endtime.hour() - starttime.hour()) * 2
            if (num_blocks < 0) {
                num_blocks += 48
            }
    
          const res = await createEvent({title: data.title, start_times: start_times, num_blocks: num_blocks})
          if (res.statusCode != 200) {
            console.log('error')
          } else {
            navigate("event/" + res.id)
          }
    
        }
      }

    return (
        <EventForm model={{RHFController: control, RHFSubmit: handleSubmit(onSubmit)}} handleEvent={() => {}} />
    )
}