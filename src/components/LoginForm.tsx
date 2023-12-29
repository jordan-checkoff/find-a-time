import { Controller, useForm, SubmitHandler } from "react-hook-form"
import Button from "./common/Button"
import TextInput from "./common/TextInput"
import { Event } from "../interfaces/interfaces"

interface props {
    eventData: Event
    setUser: React.Dispatch<React.SetStateAction<string>>
}

interface FormData {
    user: string
}

export default function LoginForm({eventData, setUser}: props) {

    const { control, handleSubmit } = useForm<FormData>({defaultValues: {
        user: ""
      },
    })

    const onSubmit: SubmitHandler<FormData> = (data) => {
        setUser(data.user)
        if (!eventData?.availability_by_user.has(data.user)) {
            const dupe = {...eventData}
            dupe.availability_by_user?.set(data.user, new Set())
        }
    }

    return (
        <div>
            <p>Enter your username to set your availability</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="user"
                    control={control}
                    render={({ field, formState }) => <TextInput value={field.value} onChange={field.onChange} error={formState.errors[field.name]?.message} label="User" />}
                    rules={{required: "Field is required"}}
                />
                <Button text={"Log In"} form={true} />
            </form>
        </div>
    )
}