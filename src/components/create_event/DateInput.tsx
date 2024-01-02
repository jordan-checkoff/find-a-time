import { forwardRef, Ref } from 'react';
import { InputProps } from '../../interfaces/interfaces';
import dayjs, { Dayjs } from 'dayjs';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import "react-multi-date-picker/styles/layouts/mobile.css"



export default forwardRef(function DateInput({value, onChange, error, label}: InputProps<Dayjs[]>, ref: Ref<HTMLInputElement>) {


    const handleChange = (x: DateObject | DateObject[] | null) => {
        if (x == null) {
            onChange([])
        } else if (x instanceof DateObject) {
            onChange([dayjs(x.valueOf())])
        } else {
            const output = x.map(y => dayjs(y.valueOf()))
            output.sort(function(a,b){
                return a.valueOf() - b.valueOf();
              })
            onChange(output)
        }
    }

    const values = value ? (value as Dayjs[]).map(x => new DateObject(x.valueOf())) : []


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

})