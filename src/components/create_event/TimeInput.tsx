import { forwardRef, Ref } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { InputProps } from '../../interfaces/interfaces';
import DropdownInput from '../common/DropdownInput';
import { TIME_OPTIONS } from '../../utils/dropdown_options';



export default forwardRef(function DateInput({value, onChange, error, label}: InputProps<Dayjs | null>, ref: Ref<HTMLInputElement>) {

    const val = value ? value.hour() * 2 : ""

    const handleChange = (x: number) => {
        const newval = dayjs().hour(x / 2)
        onChange(newval)
    }

    return (
        <DropdownInput
            value={val}
            onChange={(e) => handleChange(e.target.value)}
            error={error}
            label={label}
            options={TIME_OPTIONS}
        />
    )

    
})