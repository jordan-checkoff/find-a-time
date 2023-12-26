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
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="title"
                control={control}
                render={({ field, formState }) => <TextInput value={field.value} onChange={field.onChange} name={field.name} error={formState.errors[field.name]?.message} />}
                rules={{required: "Field is required"}}
            />
            <Controller
                name="dates"
                control={control}
                render={({ field }) => <DateInput value={field.value} onChange={field.onChange} name={field.name} error={formState.errors[field.name]?.message} />}
                rules={{required: "Field is required"}}
            />
            <Controller
                name="starttime"
                control={control}
                render={({ field }) => <TimeInput value={field.value} onChange={field.onChange} name={field.name} error={formState.errors[field.name]?.message} />}
                rules={{required: "Field is required"}}
            />
            <Controller
                name="endtime"
                control={control}
                render={({ field }) => <TimeInput value={field.value} onChange={field.onChange} name={field.name} error={formState.errors[field.name]?.message} />}
                rules={{required: "Field is required"}}
            />
            <Button text={"Submit"} form={true} />
        </form>
    )
}