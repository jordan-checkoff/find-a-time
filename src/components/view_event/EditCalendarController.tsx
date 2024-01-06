import EditCalendar from "./EditCalendar";
import Event from "../../interfaces/Event";
import { ReducerAction } from "../../interfaces/interfaces";
import { useReducer } from "react";



interface props {
    data: Event,
    user: string,
    setData: (x: number, y: boolean) => void,
    timezone: string,
}

export enum EditCalendarActions {
    MOUSE_DOWN,
    MOUSE_UP,
    MOUSE_ENTER
}

export interface EditCalendarInterface {
    mouseDown: boolean,
    adding: boolean,
    selected: number[],
    hover: number,
    column: number,
}

export default function EditCalendarController({data, user, setData, timezone}: props) {

    const intialState: EditCalendarInterface = {
        mouseDown: false,
        adding: true,
        column: 0,
        selected: [],
        hover: 0
    }

    const reducer = (state: EditCalendarInterface, x: ReducerAction<number>) => {
        const {action, value} = x
        if (action == EditCalendarActions.MOUSE_DOWN) {
            const adding = !data.availability_by_user.get(user)?.has(value[0])
            data.update_availability(user, adding, value[0])
            return {
                mouseDown: true,
                selected: [value[0]],
                adding: adding,
                column: value[1],
                hover: value[0]
            }
        }

        if (action == EditCalendarActions.MOUSE_UP) {
            data.send_update(user)
            return {
                ...state,
                mouseDown: false
            }
        }

        if (action == EditCalendarActions.MOUSE_ENTER && state.mouseDown && state.hover != value[0]) {
            if (value[1] == state.column && Math.abs(value[0] - state.hover) == 30*60*1000) {
                if (state.selected.length > 1 && state.selected[state.selected.length-2] == value[0]) {
                    data.update_availability(user, !state.adding, state.selected[state.selected.length-1])
                    state.selected.pop()
                } else {
                    data.update_availability(user, state.adding, value[0])
                    state.selected.push(value[0])
                }

                return {
                    ...state,
                    hover: value[0],
                    selected: state.selected
                }
            }
        }

        return state
    }

    const [state, dispatch] = useReducer(reducer, intialState)

    return (
        <EditCalendar model={state} handleEvent={dispatch} data={data} user={user} setData={setData} timezone={timezone} />
    )
}