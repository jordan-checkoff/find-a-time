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
    calendar: C
}

interface cellProps {
    colNum: number,
    rowNum: number
}



export default function EditCalendar({data, user, calendar, handleEvent, model} : props) {

    const handleMouseDown = (row: number, col: number) => {
        handleEvent({action: EditCalendarActions.MOUSE_DOWN, value: [row, col]})
    }
    const handleMouseOver = (row: number, col: number) => {
        if (model.mouseDown) {
            handleEvent({action: EditCalendarActions.MOUSE_ENTER, value: [row, col]})
        }
    }

    const handleMouseUp = () => {
        handleEvent({action: EditCalendarActions.MOUSE_UP, value: 0})
    }

    document.onpointerup = handleMouseUp;


    function EditCell({colNum, rowNum} : cellProps) {

        const ms = calendar.get_datetime(rowNum, colNum)

        let checked = data.availability_by_time.get(ms)?.has(user)

        const minCol = Math.min(model.startCol, model.endCol)
        const maxCol = Math.max(model.startCol, model.endCol)
        const minRow = Math.min(model.startRow, model.endRow)
        const maxRow = Math.max(model.startRow, model.endRow)

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