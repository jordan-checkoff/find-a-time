import { TimePicker } from '@mui/x-date-pickers';
import { ControllerRenderProps } from 'react-hook-form';
import { forwardRef, Ref } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { InputProps } from '../../interfaces/interfaces';


interface props<T> extends InputProps<T> {
    options: Option<T>[]
}

interface Option<T> {
    val: T,
    display: string
}


export default forwardRef(function DropdownInput<T extends (number | string)>({value, onChange, error, label, options}: props<T>, ref: Ref<HTMLInputElement>) {

    return (
        <div>
            <FormControl fullWidth error={error!= undefined}>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Age"
                    onChange={onChange}
                    inputRef={ref}
                >
                    {options.map(({val, display}) => <MenuItem value={val}>{display}</MenuItem>)}
                </Select>
                {error != undefined && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
        </div>
    )
})