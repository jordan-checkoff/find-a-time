import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { updateAvailability } from "../../utils/api_calls";
import { ReducerAction } from "../../interfaces/interfaces";
import dayjs from "dayjs";
import EventAvailabilityInterface, { EventAvailabilityPages } from "../../interfaces/EventAvailabilityInterface";
import ViewEventSections from "./ViewEventSections";
import Event from "../../interfaces/Event";

export interface EditCalendarInterface {
    mouseDown: boolean,
    adding: boolean,
    startRow: number,
    endRow: number,
    startCol: number,
    endCol: number,
}

export enum EditCalendarActions {
    MOUSE_DOWN,
    MOUSE_UP,
    MOUSE_ENTER
}

export enum EventAvailabilityActions {
    SET_EVENT,
    SET_PAGE,
    SET_USER,
    SET_TIMEZONE,
    EDIT_AVAILABILITY
}

export default function EventAvailabilityController() {

    const { id } = useParams()

    const initialState: EventAvailabilityInterface = {
        loading: true,
        event: null,
        page: EventAvailabilityPages.VIEW,
        user: null,
        calendar: null,
    }

    const reducer = (state: EventAvailabilityInterface, change: ReducerAction<EventAvailabilityActions>) => {
        console.log(1)
        const {action, value} = change

        if (action == EventAvailabilityActions.SET_EVENT) {
            return {
                ...state,
                loading: false,
                event: value,
                calendar: value.get_calendar()
            }
        }

        if (action == EventAvailabilityActions.SET_PAGE) {
            return {
                ...state,
                page: value
            }
        }

        if (action == EventAvailabilityActions.SET_USER) {
            return {
                ...state,
                user: value
            }
        }

        if (action == EventAvailabilityActions.SET_TIMEZONE) {
            state.calendar?.update_timezone(value)

            return {
                ...state,
                calendar: state.calendar
            }
        }

        if (action == EventAvailabilityActions.EDIT_AVAILABILITY && state.event && state.user) {
            state.event.update_availability(value[0], value[1], state.user)
        }

        return state
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const fetchEvent = async (id: string) => {
        const event = new Event()
        await event.from_id(id)

        dispatch({action: EventAvailabilityActions.SET_EVENT, value: event})
    }

    const initialState2: EditCalendarInterface = {
        mouseDown: false,
        adding: true,
        startRow: -1,
        endRow: -1,
        startCol: -1,
        endCol: -1
    }

    const reducer2 = (statee: EditCalendarInterface, changee: ReducerAction<EditCalendarActions>) => {
        console.log(2)
        const {action, value} = changee
        if (action == EditCalendarActions.MOUSE_DOWN) {

            const ms = state.calendar.get_datetime(value[0], value[1])
            const adding = !state.event.availability_by_user.get(state.user)?.has(ms)
            return {
                ...statee,
                mouseDown: true,
                adding: adding,
                startCol: value[1],
                endCol: value[1],
                startRow: value[0],
                endRow: value[0]
            }
        }

        if (action == EditCalendarActions.MOUSE_ENTER) {
            if (statee.mouseDown) {
                return {
                    ...statee,
                    endRow: value[0],
                    endCol: value[1]
                }
            }

        }


        if (action == EditCalendarActions.MOUSE_UP) {
            if (statee.mouseDown) {
                const datetimes = state.calendar.get_datetimes(statee.startRow, statee.endRow, statee.startCol, statee.endCol)

                dispatch({action: EventAvailabilityActions.EDIT_AVAILABILITY, value: [datetimes, statee.adding]})

                return {
                    ...statee,
                    mouseDown: false,
                    startRow: -1,
                    startCol: -1,
                    endRow: -1,
                    endCol: -1
                }
            }
        }

        return statee
    }

    const [calendarState, calendarDispatch] = useReducer(reducer2, initialState2)


    useEffect(() => {
        if (id) {
            fetchEvent(id)
        }
    }, [id])

    return (
        <ViewEventSections model={state} handleEvent={dispatch} model2={calendarState} handleEvent2={calendarDispatch} />
    )
}