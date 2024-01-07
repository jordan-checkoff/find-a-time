import EditCalendar from "./EditCalendar";
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

            const ms = calendar.get_datetime(value[0], value[1])
            const adding = !data.availability_by_user.get(user)?.has(ms)
            return {
                ...state,
                mouseDown: true,
                adding: adding,
                startCol: value[1],
                endCol: value[1],
                startRow: value[0],
                endRow: value[0]
            }
        }

        if (action == EditCalendarActions.MOUSE_ENTER) {
            if (state.mouseDown) {
                return {
                    ...state,
                    endRow: value[0],
                    endCol: value[1]
                }
            }

        }


        if (action == EditCalendarActions.MOUSE_UP) {
            if (state.mouseDown) {
                const datetimes = calendar.get_datetimes(state.startRow, state.endRow, state.startCol, state.endCol)
                updateAvailability(datetimes, state.adding)
                return {
                    ...state,
                    mouseDown: false,
                    startRow: -1,
                    startCol: -1,
                    endRow: -1,
                    endCol: -1
                }
            }
        }

        return state
    }

    const [state, dispatch] = useReducer(reducer, intialState)

    return (
        <EditCalendar model={state} handleEvent={dispatch} data={data} user={user} calendar={calendar} />
    )
}