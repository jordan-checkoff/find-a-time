import { TextField } from "@mui/material"
import { forwardRef } from 'react';
import { InputProps } from "../../interfaces/interfaces";


export default forwardRef(function TextInput({value, onChange, error, label}: InputProps<string>, ref) {

    return (
        <div>
            <p className="mb-1 text-sm">{label}{error && <span className="text-red-500"> - {error}</span>}</p>
            <TextField
                value={value}
                onChange={onChange}
                inputRef={ref}
                error={error != undefined}
                fullWidth
                size="small"
            />
        </div>
    )
})