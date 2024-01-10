import EditCalendar from "./EditCalendarNavigator";
import Event from "../../interfaces/Event";
import { ReducerAction } from "../../interfaces/interfaces";
import { useReducer } from "react";
import { Calendar as C } from "../../interfaces/Event";



interface props {
    data: Event,
    user: string,
    calendar: C,
    updateAvailability: (x: number[], y: boolean) => void
}

export enum EditCalendarActions {
    MOUSE_DOWN,
    MOUSE_UP,
    MOUSE_ENTER
}

export interface EditCalendarInterface {
    mouseDown: boolean,
    adding: boolean,
    startRow: number,
    endRow: number,
    startCol: number,
    endCol: number
}

export default function EditCalendarController({data, user, calendar, updateAvailability}: props) {

    return (
        // <EditCalendar model={state} handleEvent={dispatch} data={data} user={user} calendar={calendar} />
        <p>A</p>
    )
}