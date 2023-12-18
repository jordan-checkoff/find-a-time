import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Event } from "../interfaces";
import Calendar from "./Calendar";

interface props {
    data: Event,
    user: string,
    setData: Dispatch<SetStateAction<Event | undefined>>
}

interface datetime {
    datetime: string
}



export default function EditCalendar({data, user, setData} : props) {

    function EditCell({datetime} : datetime) {

        function handleChange(e: ChangeEvent<HTMLInputElement>) {
            const dupe = {...data}
            if (e.target.checked) {
                dupe.availability_by_time.get(datetime)?.add(user)
            } else {
                dupe.availability_by_time.get(datetime)?.delete(user)
            }
            setData(dupe)
        }

        const checked = data.availability_by_time.get(datetime)?.has(user)
    
        return (
            <div>
                <input type="checkbox" checked={checked} onChange={handleChange} />
            </div>
        )
    }

    return (
        <Calendar date_range={data.date_range} time_range={data.time_range} Cell={EditCell} />
    )
}