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
    EDIT_CALENDAR
}

export default function EventAvailabilityController() {

    const { id } = useParams()

    const initialState: EventAvailabilityInterface = {
        loading: true,
        event: null,
        page: EventAvailabilityPages.VIEW,
        user: null,
        calendar: null,
        calendarState: {
            mouseDown: false,
            adding: true,
            startRow: -1,
            endRow: -1,
            startCol: -1,
            endCol: -1
        }
    }

    const reducer = (state: EventAvailabilityInterface, change: ReducerAction<EventAvailabilityActions>) => {
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

        if (action == EventAvailabilityActions.EDIT_CALENDAR && state.calendar && state.event && state.user) {
            if (value[0] == EditCalendarActions.MOUSE_DOWN) {

                const ms = state.calendar.get_datetime(value[1], value[2])
                const adding = !state.event.availability_by_user.get(state.user)?.has(ms)
                return {
                    ...state,
                    calendarState: {
                        mouseDown: true,
                        adding: adding,
                        startCol: value[2],
                        endCol: value[2],
                        startRow: value[1],
                        endRow: value[1]
                    }
                }
            }
    
            if (value[0] == EditCalendarActions.MOUSE_ENTER) {
                if (state.calendarState.mouseDown) {
                    return {
                        ...state,
                        calendarState: {
                            ...state.calendarState,
                            endRow: value[1],
                            endCol: value[2]
                        }
                    }
                }
    
            }
    
    
            if (value[0] == EditCalendarActions.MOUSE_UP) {
                if (state.calendarState.mouseDown) {
                    const datetimes = state.calendar.get_datetimes(state.calendarState.startRow, state.calendarState.endRow, state.calendarState.startCol, state.calendarState.endCol)
                    state.event.update_availability(datetimes, state.calendarState.adding, state.user)

                    return {
                        ...state,
                        event: state.event,
                        calendarState: {
                            ...state.calendarState,
                            mouseDown: false,
                            startRow: -1,
                            startCol: -1,
                            endRow: -1,
                            endCol: -1

                        }
                    }
                }
            }
        }

        return state
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const fetchEvent = async (id: string) => {
        const event = new Event()
        await event.from_id(id)

        dispatch({action: EventAvailabilityActions.SET_EVENT, value: event})
    }


    useEffect(() => {
        if (id) {
            fetchEvent(id)
        }
    }, [id])

    return (
        <ViewEventSections model={state} handleEvent={dispatch} />
    )
}