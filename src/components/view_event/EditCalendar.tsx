import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import Event from "../../interfaces/Event";
import Calendar from "./Calendar";
import { updateAvailability } from "../../utils/api_calls";
import { Dayjs } from "dayjs";
import { Checkbox } from "@mui/material";

interface props {
    data: Event,
    user: string,
    setData: (x: number, y: boolean) => void,
    timezone: string,
    setUser: (x: null) => void
}

interface cellProps {
    datetime: Dayjs
}



export default function EditCalendar({data, user, setData, timezone, setUser} : props) {

    function EditCell({datetime} : cellProps) {

        const ms = datetime.valueOf()

        const checked = data.availability_by_time.get(ms)?.has(user)
    
        return (
            <div className="flex justify-center h-full">
                <Checkbox checked={checked} onChange={() => setData(datetime.valueOf(), !checked)} style={{padding: 0}} />
            </div>
        )
    }

    return (
        <Calendar timezone={timezone} data={data} Cell={EditCell} />
    )
}