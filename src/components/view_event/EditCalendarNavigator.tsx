import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Event from "../../interfaces/Event";
import Calendar from "./Calendar";
import { Dayjs } from "dayjs";
import { Checkbox } from "@mui/material";
import MVCInterface from "../../interfaces/MVCInterface";
import { EditCalendarActions, EditCalendarInterface } from "./EditCalendarController";
import { Calendar as C } from "../../interfaces/Event";
import DragSelect from "dragselect";
import Button from "../common/Button";
import EditCalendar from "./EditCalendar";
import LoginForm from "./LoginForm";

interface props {
    data: Event,
    calendar: C,
    updateAvailability: (user: string, datetimes: number[], adding: boolean) => void
}


export default function EditCalendarNavigator({data, calendar, updateAvailability} : props) {
    const [start, setStart] = useState(0)
    const [user, setUser] = useState("")


    if (user) {
        if (window.innerWidth > 1000) {
            return (
                <>
                    <p className="mb-8 text-xl font-bold">Edit Your Availability</p>
                    <EditCalendar user={user} data={data} calendar={calendar} startCol={0} endCol={calendar.dates.length} updateAvailability={updateAvailability} />
                </>
            )
        } else {
            const numCols = window.innerWidth > 1000 ? calendar.dates.length : Math.floor((window.innerWidth - 100) / 64)

            return (
                <>
                    <div className="pb-10 w-full">
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            <Button onClick={() => setStart(start - 1)} text="<" disabled={start == 0} />
                            <Button onClick={() => setStart(start + 1)} text=">" disabled={start + numCols >= calendar.dates.length} />
                        </div>
                    </div>
                    <p className="mb-8 text-xl font-bold">Edit Your Availability</p>
                    <EditCalendar user={user} data={data} calendar={calendar} startCol={start} endCol={start+numCols} updateAvailability={updateAvailability} />
                </>
            )
        }
    } else {
        return (
            <div className="px-12">
                <p className="text-lg mb-4">Log in to edit your availability</p>
                <LoginForm setUser={setUser} />
            </div>
        )
    }

}




