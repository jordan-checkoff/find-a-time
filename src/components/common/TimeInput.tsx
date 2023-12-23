import { TimePicker } from '@mui/x-date-pickers';
import { ControllerRenderProps } from 'react-hook-form';
import { forwardRef, Ref } from 'react';
import { InputProps } from '../../interfaces/interfaces';
import { Dayjs } from 'dayjs';

export interface props {
    value: any,
    onChange: any
    name: string,
    error: string | undefined
}

export default forwardRef(function DateInput({value, onChange, name, error}: props, ref: Ref<HTMLInputElement>) {

    return (
        <TimePicker
            value={value}
            name={name}
            onChange={onChange}
            inputRef={ref}
            slotProps={{
                textField: {
                  helperText: error != undefined && error,
                  error: error != undefined
                },
              }} 
        />
    )
})