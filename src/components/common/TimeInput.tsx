import { TimePicker } from '@mui/x-date-pickers';
import { ControllerRenderProps } from 'react-hook-form';
import { forwardRef, Ref } from 'react';
import { InputProps } from '../../interfaces/interfaces';
import dayjs, { Dayjs } from 'dayjs';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export interface props {
    value: any,
    onChange: any
    name: string,
    error: string | undefined
}

export default forwardRef(function DateInput({value, onChange, error}: props, ref: Ref<HTMLInputElement>) {

    const val = value ? value.hour() * 2 : ""

    const handleChange = (x: number) => {
        const newval = dayjs().hour(x / 2)
        onChange(newval)
    }

    return (
        <FormControl error={error!= undefined}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={val}
                label="Age"
                onChange={x => handleChange(x.target.value as number)}
                inputRef={ref}
            >
                <MenuItem value={0}>12:00 AM</MenuItem>
                <MenuItem value={2}>1:00AM</MenuItem>
                <MenuItem value={4}>2:00AM</MenuItem>
                <MenuItem value={6}>3:00AM</MenuItem>
                <MenuItem value={8}>4:00AM</MenuItem>
                <MenuItem value={10}>5:00AM</MenuItem>
                <MenuItem value={12}>6:00AM</MenuItem>
                <MenuItem value={14}>7:00AM</MenuItem>
                <MenuItem value={16}>8:00AM</MenuItem>
                <MenuItem value={18}>9:00AM</MenuItem>
                <MenuItem value={20}>10:00AM</MenuItem>
                <MenuItem value={22}>11:00AM</MenuItem>
                <MenuItem value={24}>12:00PM</MenuItem>
                <MenuItem value={26}>1:00PM</MenuItem>
                <MenuItem value={28}>2:00PM</MenuItem>
                <MenuItem value={30}>3:00PM</MenuItem>
                <MenuItem value={32}>4:00PM</MenuItem>
                <MenuItem value={34}>5:00PM</MenuItem>
                <MenuItem value={36}>6:00PM</MenuItem>
                <MenuItem value={38}>7:00PM</MenuItem>
                <MenuItem value={40}>8:00PM</MenuItem>
                <MenuItem value={42}>9:00PM</MenuItem>
                <MenuItem value={44}>10:00PM</MenuItem>
                <MenuItem value={46}>11:00PM</MenuItem>
                <MenuItem value={48}>12:00AM</MenuItem>
            </Select>
        </FormControl>
    )
})