import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { ControllerRenderProps } from 'react-hook-form';
import { forwardRef, Ref } from 'react';
import { InputProps } from '../../interfaces/interfaces';
import dayjs, { Dayjs } from 'dayjs';
import { ChangeEventHandler, ChangeEvent } from 'react';

export interface props {
    value: any,
    onChange: any
    name: string,
    error: string | undefined
}

export default forwardRef(function DateInput({value, onChange, name, error}: props, ref: Ref<HTMLInputElement>) {

    return (
        <DatePicker
            value={value}
            name={name}
            onChange={onChange}
            inputRef={ref}
            slotProps={{
                textField: {
                  helperText: error != undefined && error,
                  error: error != undefined,
                },
              }}
            minDate={dayjs()}
        />
    )
})