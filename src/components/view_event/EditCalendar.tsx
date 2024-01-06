import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Event from "../../interfaces/Event";
import Calendar from "./Calendar";
import { updateAvailability } from "../../utils/api_calls";
import { Dayjs } from "dayjs";
import { Checkbox } from "@mui/material";
import MVCInterface from "../../interfaces/MVCInterface";
import { EditCalendarActions, EditCalendarInterface } from "./EditCalendarController";

interface props extends MVCInterface<EditCalendarInterface, EditCalendarActions> {
    data: Event,
    user: string,
    setData: (x: number, y: boolean) => void,
    timezone: string,
}

interface cellProps {
    datetime: Dayjs,
    column: number
}



export default function EditCalendar({data, user, setData, timezone, handleEvent, model} : props) {

    const handleMouseUp = () => {
        handleEvent({action: EditCalendarActions.MOUSE_UP, value: 0})
    }

    useEffect(() => {
        if (model.mouseDown) {
            window.addEventListener("mouseup", handleMouseUp)
            return () => window.removeEventListener("mouseup", handleMouseUp)
        }
    }, [model.mouseDown])



    function EditCell({datetime, column} : cellProps) {

        const handleMouseDown = () => {
            handleEvent({action: EditCalendarActions.MOUSE_DOWN, value: [datetime.valueOf(), column]})
        };

        const cellRef = useRef<HTMLDivElement>(null)

        const checkHover = (e: any) => {
            if (cellRef.current) {
              const mouseOver = cellRef.current.contains(e.target);
              if (mouseOver) {
                handleEvent({action: EditCalendarActions.MOUSE_ENTER, value: [datetime.valueOf(), column]})
              }
            }
          };

        useEffect(() => {
            window.addEventListener("mousemove", checkHover, true);

            return () => window.removeEventListener("mousemove", checkHover, true)
        }, [])

        const ms = datetime.valueOf()

        const checked = data.availability_by_time.get(ms)?.has(user)

        return <div
                    className={`flex justify-center h-full`}
                    style={checked ? {backgroundColor: "red"} : {}}
                    onMouseDown={handleMouseDown} 
                    ref={cellRef}
                />

    }

    return (
        <Calendar timezone={timezone} data={data} Cell={(x) => EditCell(x)} />
    )
}