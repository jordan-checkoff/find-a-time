import { Controller, useForm, SubmitHandler } from "react-hook-form"
import Button from "../common/Button"
import TextInput from "../common/TextInput"
import { Event } from "../../interfaces/interfaces"
import { createTheme } from "@mui/material"

interface props {
    setUser: (x: string) => void
}

interface FormData {
    user: string
}

export default function LoginForm({setUser}: props) {

    const { control, handleSubmit } = useForm<FormData>({defaultValues: {
        user: ""
      },
    })

    const onSubmit: SubmitHandler<FormData> = (data) => {
        setUser(data.user)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-8">
                    <Controller
                        name="user"
                        control={control}
                        render={({ field, formState }) => <TextInput value={field.value} onChange={field.onChange} error={formState.errors[field.name]?.message} label="Username" />}
                        rules={{required: "Field is required"}}
                    />
                </div>
                <Button text={"Log In"} form={true} />
            </form>
        </div>
    )
}