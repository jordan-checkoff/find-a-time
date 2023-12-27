import { TextField } from "@mui/material"
import { ControllerRenderProps } from 'react-hook-form';
import { ChangeEventHandler, forwardRef, Ref } from 'react';
import { InputProps } from "../../interfaces/interfaces";


export default forwardRef(function TextInput({value, onChange, error, label}: InputProps<string>, ref) {

    return (
        <div>
            <TextField
                value={value}
                onChange={onChange}
                inputRef={ref}
                error={error != undefined}
                helperText={error != undefined && error}
                label={label}
                fullWidth
            />
        </div>
    )
})