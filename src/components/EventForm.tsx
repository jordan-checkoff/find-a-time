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
    startdate: Dayjs | null,
    enddate: Dayjs | null,
    starttime: Dayjs | null,
    endtime: Dayjs | null
}


export default function EventForm() {

    const navigate = useNavigate()

    const { control, formState, handleSubmit } = useForm<FormData>({
        defaultValues: {
          title: "",
          startdate: null,
          enddate: null,
          starttime: null,
          endtime: null
        },
      })

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(data)
        console.log('a')
        // const title = data.title
        // const startdate = data.startdate?.$d
        // const enddate = data.enddate?.$d
        // const starttime = data.starttime?.$d
        // const endtime = data.endtime?.$d
    
        // if (title && startdate && starttime && enddate && endtime) {
        //   startdate?.setHours(starttime.getHours() + starttime.getMinutes())
        //   enddate?.setHours(starttime.getHours() + starttime.getMinutes())
    
        //   const start_times = []
        //   while (startdate <= enddate) {
        //     start_times.push(startdate.getTime())
        //     startdate.setDate(startdate.getDate() + 1)
        //   }
    
        //   const num_blocks = Math.floor((endtime.getTime() - starttime.getTime()) / (1000*60*30))
    
        //   const res = await createEventApi(title, start_times, num_blocks)
        //   if (res) {
        //     navigate("event/" + res["id"])
        //   } else {
        //     console.log('error')
        //   }
    
        // }
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
                name="startdate"
                control={control}
                render={({ field }) => <DateInput value={field.value} onChange={field.onChange} name={field.name} error={formState.errors[field.name]?.message} />}
                rules={{required: "Field is required"}}
            />
            <Controller
                name="enddate"
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