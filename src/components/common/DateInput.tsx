// import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { ControllerRenderProps } from 'react-hook-form';
import { forwardRef, Ref, useState } from 'react';
import { InputProps } from '../../interfaces/interfaces';
import dayjs, { Dayjs } from 'dayjs';
import { ChangeEventHandler, ChangeEvent } from 'react';
import { Calendar } from "react-multi-date-picker";
import DatePicker, { DateObject } from 'react-multi-date-picker';
import "react-multi-date-picker/styles/layouts/mobile.css"
import DatePanel from "react-multi-date-picker/plugins/date_panel" 
import InputIcon from "react-multi-date-picker/components/input_icon"



export default forwardRef(function DateInput({value, onChange, error, label}: InputProps<Dayjs[]>, ref: Ref<HTMLInputElement>) {

    const [open, setOpen] = useState<boolean>(false)

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

    console.log(error == undefined)

    return (
        <div>
            <DatePicker
                className="rmdp-mobile"
                multiple
                value={values}
                onChange={handleChange}
                containerClassName="w-full"
                inputClass={error == undefined ? 'w-full border rounded border-black/25 p-4 hover:border-black' : 'w-full border rounded border-red-500 p-4'}
                placeholder='Date options'
            />
            <p className="text-red-500 text-xs ml-4">{error}</p>
        </div>
    )

    // return (
    //     <div className='flex justify-center'> 
    //         <Calendar
    //             className="rmdp-mobile"
    //             multiple
    //             value={values}
    //             onChange={handleChange}
    //             shadow={false}
    //         >
    //             {error != undefined && (
    //                 //if you want to show an error message
    //                 <span>your error message !</span>
    //             )}
    //         </Calendar>
    //      </div>
    // )
})