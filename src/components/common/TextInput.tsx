import { TextField } from "@mui/material"
import { ControllerRenderProps } from 'react-hook-form';
import { ChangeEventHandler, forwardRef, Ref } from 'react';
import { InputProps } from "../../interfaces/interfaces";

export interface props {
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>
    name: string,
    error: string | undefined
}


export default forwardRef(function TextInput({value, onChange, error}: props, ref) {

    return (
        <TextField
            value={value}
            onChange={onChange}
            inputRef={ref}
            error={error != undefined}
            helperText={error != undefined && error}
        />
    )
})