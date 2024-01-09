import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Event from "../../interfaces/Event";
import Calendar from "./Calendar";
import { Dayjs } from "dayjs";
import { Checkbox } from "@mui/material";
import MVCInterface from "../../interfaces/MVCInterface";
import { EditCalendarActions, EditCalendarInterface } from "./EditCalendarController";
import { Calendar as C } from "../../interfaces/Event";

interface props extends MVCInterface<EditCalendarInterface, EditCalendarActions> {
    data: Event,
    user: string,
    calendar: C,
    updateCalendar: any
}

interface cellProps {
    colNum: number,
    rowNum: number
}



export default function EditCalendar({data, user, calendar, updateCalendar, handleEvent, model} : props) {

    const handleMouseDown = (row: number, col: number) => {
        updateCalendar(EditCalendarActions.MOUSE_DOWN, row, col)
    }
    const handleMouseOver = (row: number, col: number) => {
        if (model.mouseDown) {
            updateCalendar(EditCalendarActions.MOUSE_ENTER, row, col)
        }
    }

    const handleMouseUp = () => {
        updateCalendar(EditCalendarActions.MOUSE_UP, 0, 0)
    }

    document.onpointerup = handleMouseUp;


    function EditCell({colNum, rowNum} : cellProps) {

        const ms = calendar.get_datetime(rowNum, colNum)

        let checked = data.availability_by_time.get(ms)?.has(user)

        const minCol = Math.min(model.startCol, model.endCol)
        const maxCol = Math.max(model.startCol, model.endCol)
        const minRow = Math.min(model.startRow, model.endRow)
        const maxRow = Math.max(model.startRow, model.endRow)

        if (!data.availability_by_time.has(ms)) {
            return <div className="h-full bg-gray-400" />
        }

        if (colNum >= minCol && colNum <= maxCol && rowNum >= minRow && rowNum <= maxRow) {
            checked = model.adding
        }

        return (
                <div
                className={`flex justify-center h-full touch-pinch-zoom`}
                style={checked ? {backgroundColor: "red"} : {}}
                onPointerDown={() => handleMouseDown(rowNum, colNum)}
                onPointerMove={(e) => handleMouseOver(rowNum, colNum)}
                />
        )
    

    }

    return (
        <Calendar calendar={calendar} data={data} Cell={EditCell} />
    )
}