import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { Event } from "../../interfaces/interfaces";
import Calendar from "./Calendar";
import { updateAvailability } from "../../utils/api_calls";
import { Dayjs } from "dayjs";

interface props {
    data: Event,
    user: string,
    setData: (x: number, y: boolean) => void,
    timezone: string,
    setUser: (x: null) => void
}

interface datetime {
    datetime: Dayjs
}



export default function EditCalendar({data, user, setData, timezone, setUser} : props) {

    function EditCell({datetime} : datetime) {

        const ms = datetime.valueOf()

        const checked = data.availability_by_time.get(ms)?.has(user)
    
        return (
            <div>
                <input type="checkbox" checked={checked} onChange={() => setData(datetime.valueOf(), !checked)} />
            </div>
        )
    }

    return (
        <div>
            <p>User: {user}</p>
            <Calendar timezone={timezone} start_times={data.start_times} num_blocks={data.num_blocks} Cell={EditCell} />
            <button onClick={() => setUser(null)}>Sign out</button>
        </div>        
    )
}