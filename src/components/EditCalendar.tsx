import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { Event } from "../interfaces";
import Calendar from "./Calendar";
import { updateAvailability } from "../apiCalls";

interface props {
    data: Event,
    user: string,
    setData: Dispatch<SetStateAction<Event | undefined>>
}

interface datetime {
    datetime: Date
}



export default function EditCalendar({data, user, setData} : props) {

    useEffect(() => {
        const x = data.availability_by_user.get(user)
        if (x) {
            updateAvailability(data.id, user, x)
        }
    }, [data])

    function EditCell({datetime} : datetime) {

        async function handleChange(e: ChangeEvent<HTMLInputElement>) {
            const dupe = {...data}
            if (e.target.checked) {
                // dupe.availability_by_time.get(datetime)?.add(user)
                // dupe.availability_by_user.get(user)?.add(datetime)
            } else {
                // dupe.availability_by_time.get(datetime)?.delete(user)
                // dupe.availability_by_user.get(user)?.delete(datetime)
            }
            setData(dupe)
        }

        // const checked = data.availability_by_time.get(datetime)?.has(user)
    
        return (
            <div>
                {/* <input type="checkbox" checked={checked} onChange={handleChange} /> */}
            </div>
        )
    }

    return (
        <Calendar start_times={data.start_times} num_blocks={data.num_blocks} Cell={EditCell} />
    )
}