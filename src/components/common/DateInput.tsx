// import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { ControllerRenderProps } from 'react-hook-form';
import { forwardRef, Ref } from 'react';
import { InputProps } from '../../interfaces/interfaces';
import dayjs, { Dayjs } from 'dayjs';
import { ChangeEventHandler, ChangeEvent } from 'react';
import { Calendar } from "react-multi-date-picker";
import { DateObject } from 'react-multi-date-picker';


export interface props {
    value: any,
    onChange: any
    name: string,
    error: string | undefined
}

export default forwardRef(function DateInput({value, onChange, error}: props, ref: Ref<HTMLInputElement>) {

    const handleChange = (x: DateObject | DateObject[] | null) => {
        if (x == null) {
            onChange([])
        } else if (x instanceof DateObject) {
            onChange([dayjs(x.valueOf())])
        } else {
            onChange(x.map(y => dayjs(y.valueOf())))
        }
    }

    const values = value ? (value as Dayjs[]).map(x => new DateObject(x.valueOf())) : []

    return (
        <Calendar
            multiple
            value={values}
            onChange={handleChange}
         >
            {error != undefined && (
                //if you want to show an error message
                <span>your error message !</span>
              )}
         </Calendar>
    )

})