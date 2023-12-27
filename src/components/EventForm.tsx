import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { createEventApi } from '../libs/apiCalls';
import Button from "./common/Button";
import TextInput from "./common/TextInput";
import DateInput from "./common/DateInput";
import TimeInput from "./common/TimeInput";
import { Dayjs } from "dayjs";


interface FormData {
    title: string
    dates: Dayjs[],
    starttime: Dayjs | null,
    endtime: Dayjs | null
}


export default function EventForm() {

    const navigate = useNavigate()

    const { control, formState, handleSubmit } = useForm<FormData>({
        defaultValues: {
          title: "",
          dates: [],
          starttime: null,
          endtime: null
        },
      })

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const starttime = data.starttime
        const endtime = data.endtime
    
        if (starttime && endtime) {
            const start_times = data.dates.map(x => x.hour(starttime.hour()).startOf('hour').valueOf())
            let num_blocks = (endtime.hour() - starttime.hour()) * 2
            if (num_blocks < 0) {
                num_blocks += 48
            }
    
          const res = await createEventApi(data.title, start_times, num_blocks)
          if (res) {
            navigate("event/" + res["id"])
          } else {
            console.log('error')
          }
    
        }
      }

    return (
      <div className="p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="border-2 p-8 m-auto max-w-[500px]">
          <div className="mb-8 text-center">
            <p>Enter your event's title, time range, and date options to create a FindATime!</p>
          </div>
          <hr className="mb-8" />
          <div className="mb-8">
            <Controller
                name="title"
                control={control}
                render={({ field, formState }) => <TextInput value={field.value} onChange={field.onChange} error={formState.errors[field.name]?.message} label="Event title" />}
                rules={{required: "Field is required"}}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Controller
                name="starttime"
                control={control}
                render={({ field, formState }) => <TimeInput value={field.value} onChange={field.onChange} error={formState.errors[field.name]?.message} label="Start time" />}
                rules={{required: "Field is required"}}
            />
            <Controller
                name="endtime"
                control={control}
                render={({ field, formState }) => <TimeInput value={field.value} onChange={field.onChange} error={formState.errors[field.name]?.message} label="End time" />}
                rules={{required: "Field is required"}}
            />
          </div>
          <div className="mb-8">
            <Controller
                name="dates"
                control={control}
                render={({ field, formState }) => <DateInput value={field.value} onChange={field.onChange} error={formState.errors[field.name]?.message} label="Date options" />}
                rules={{required: "Field is required"}}
            />
          </div>
          <Button text={"Submit"} form={true} />
        </form>
      </div>
    )
}