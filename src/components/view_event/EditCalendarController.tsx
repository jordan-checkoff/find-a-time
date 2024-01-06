import EditCalendar from "./EditCalendar";
import Event from "../../interfaces/Event";
import { ReducerAction } from "../../interfaces/interfaces";
import { useReducer } from "react";
import { Calendar as C } from "../../interfaces/Event";



interface props {
    data: Event,
    user: string,
    setData: (x: number, y: boolean) => void,
    calendar: C
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

export default function EditCalendarController({data, user, setData, calendar}: props) {

    const intialState: EditCalendarInterface = {
        mouseDown: false,
        adding: true,
        startRow: -1,
        endRow: -1,
        startCol: -1,
        endCol: -1
    }

    const reducer = (state: EditCalendarInterface, x: ReducerAction<number>) => {
        const {action, value} = x
        if (action == EditCalendarActions.MOUSE_DOWN) {
            const adding = !data.availability_by_user.get(user)?.has(value)
            data.update_availability(user, adding, value)
            return {
                ...state,
                mouseDown: true,
                adding: adding
            }
        }

        if (action == EditCalendarActions.MOUSE_UP) {
            // data.send_update(user)
            return {
                ...state,
                mouseDown: false
            }
        }

        // if (action == EditCalendarActions.MOUSE_ENTER && state.mouseDown && state.hover != value[0]) {
        //     if (value[1] == state.column && Math.abs(value[0] - state.hover) == 30*60*1000) {
        //         if (state.selected.length > 1 && state.selected[state.selected.length-2] == value[0]) {
        //             data.update_availability(user, !state.adding, state.selected[state.selected.length-1])
        //             state.selected.pop()
        //         } else {
        //             data.update_availability(user, state.adding, value[0])
        //             state.selected.push(value[0])
        //         }

        //         return {
        //             ...state,
        //             hover: value[0],
        //             selected: state.selected
        //         }
        //     }
        // }

        return state
    }

    const [state, dispatch] = useReducer(reducer, intialState)

    console.log(state)

    return (
        <EditCalendar model={state} handleEvent={dispatch} data={data} user={user} setData={setData} calendar={calendar} />
    )
}