import { TimePicker } from '@mui/x-date-pickers';
import { ControllerRenderProps } from 'react-hook-form';
import { forwardRef, Ref } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { InputProps } from '../../interfaces/interfaces';


interface props<T> extends InputProps<T> {
    options: Option<T>[],
    width?: number | string
}

interface Option<T> {
    val: T,
    display: string
}


export default forwardRef(function DropdownInput<T extends (number | string)>({value, onChange, error, label, options, width="auto"}: props<T>, ref: Ref<HTMLInputElement>) {

    return (
        <div>
            <p className="mb-1 text-sm">{label}{error && <span className="text-red-500"> - {error}</span>}</p>
            <FormControl fullWidth error={error!= undefined}>
                {/* <InputLabel id="demo-simple-select-label" size="small">{label}</InputLabel> */}
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={onChange}
                    inputRef={ref}
                    size="small"
                    style={{backgroundColor: "white", width: width}}
                >
                    {options.map(({val, display}) => <MenuItem value={val}>{display}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
    )
})