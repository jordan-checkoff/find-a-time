import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { updateAvailability } from "../../utils/api_calls";
import { ReducerAction } from "../../interfaces/interfaces";
import dayjs from "dayjs";
import EventAvailabilityInterface, { EventAvailabilityPages } from "../../interfaces/EventAvailabilityInterface";
import ViewEventSections from "./ViewEventSections";
import Event from "../../interfaces/Event";


export enum EventAvailabilityActions {
    SET_EVENT,
    SET_PAGE,
    SET_USER,
    UPDATE_AVAILABILITY,
    SET_TIMEZONE
}

export default function EventAvailabilityController() {

    const { id } = useParams()

    const initialState: EventAvailabilityInterface = {
        loading: true,
        event: null,
        page: EventAvailabilityPages.VIEW,
        user: null,
        timezone: dayjs.tz.guess()
    }

    const reducer = (state: EventAvailabilityInterface, change: ReducerAction<EventAvailabilityActions>) => {
        const {action, value} = change

        if (action == EventAvailabilityActions.SET_EVENT) {
            return {
                ...state,
                loading: false,
                event: value
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

        if (action == EventAvailabilityActions.UPDATE_AVAILABILITY && state.event && state.user) {

            state.event.update_availability(state.user, value.selected, value.datetime)

            updateAvailability(id as string, state.user as string, state.event.availability_by_user.get(state.user as string) as Set<number>)

            return {
                ...state,
                event: state.event
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