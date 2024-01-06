import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Event from "../../interfaces/Event";
import Calendar from "./Calendar";
import { updateAvailability } from "../../utils/api_calls";
import { Dayjs } from "dayjs";
import { Checkbox } from "@mui/material";
import MVCInterface from "../../interfaces/MVCInterface";
import { EditCalendarActions, EditCalendarInterface } from "./EditCalendarController";
import { Calendar as C } from "../../interfaces/Event";

interface props extends MVCInterface<EditCalendarInterface, EditCalendarActions> {
    data: Event,
    user: string,
    setData: (x: number, y: boolean) => void,
    calendar: C
}

interface cellProps {
    colNum: number,
    rowNum: number
}



export default function EditCalendar({data, user, setData, calendar, handleEvent, model} : props) {

    // const handleMouseDown = (x: number) => {
    //     handleEvent({action: EditCalendarActions.MOUSE_DOWN, value: x})
    // }

    // const handleMouseUp = (x: number) => {
    //     handleEvent({action: EditCalendarActions.MOUSE_UP, value: x})
    // }



    function EditCell({colNum, rowNum} : cellProps) {

        const ms = calendar.get_datetime(rowNum, colNum)

        const checked = data.availability_by_time.get(ms)?.has(user)

        return <div
                    className={`flex justify-center h-full`}
                    style={checked ? {backgroundColor: "red"} : {}}
                    // onMouseDown={() => handleMouseDown(ms)}
                    // onMouseUp={() => handleMouseUp(ms)}
                />

    }

    return (
        <Calendar calendar={calendar} data={data} Cell={EditCell} />
    )
}