import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Event from "../../interfaces/Event";
import Calendar from "./Calendar";
import { Dayjs } from "dayjs";
import { Checkbox } from "@mui/material";
import MVCInterface from "../../interfaces/MVCInterface";
import { Calendar as C } from "../../interfaces/Event";
import DragSelect from "dragselect";
import Button from "../common/Button";
import EditCalendar from "./EditCalendar";
import LoginForm from "./LoginForm";

interface props {
    data: Event,
    calendar: C,
    updateAvailability: (user: string, datetimes: number[], adding: boolean) => void,
    numCols: number,
    start: number,
    setStart: any,
    user: string,
    setUser: any,
    selected: any
}


export default function EditCalendarNavigator({data, calendar, selected, updateAvailability, numCols, start, setStart, user, setUser} : props) {

    if (selected) {
        return (
            <div>
                <p>{selected.date}</p>
                <p>{selected.num}/{selected.total}</p>
                {selected.users && Array.from(selected.users).map((u) => {
                    return <p>{u as string}</p>
                })}
            </div>
        )
    }

    if (user) {
        if (window.innerWidth > 1000) {
            return (
                <>
                    <p className="mb-8 text-xl font-bold">Edit Your Availability</p>
                    <EditCalendar user={user} data={data} calendar={calendar} startCol={0} endCol={calendar.dates.length} updateAvailability={updateAvailability} />
                </>
            )
        } else {
            return (
                <>
                    <div className="p-5 w-full">
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




