import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../../utils/api_calls";
import { ReducerAction } from "../../interfaces/interfaces";
import dayjs from "dayjs";
import EventAvailabilityInterface, { EventAvailabilityPages } from "../../interfaces/EventAvailabilityInterface";
import { GetEventResponse } from "../../interfaces/APIInterfaces";
import { blankEvent } from "../../utils/parseEvent";
import ViewEventSections from "./ViewEventSections";


export enum EventAvailabilityActions {
    SET_EVENT,
    SET_PAGE,
    SET_USER,
    UPDATE_AVAILABILITY,
    SET_TIMEZONE
}

export default function EventAvailabilityController() {

    const initialState: EventAvailabilityInterface = {
        loading: true,
        event: blankEvent,
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

        return state
    }

    const [state, dispatch] = useReducer(reducer, initialState)



    const fetchEvent = async (id: string) => {
        const res: GetEventResponse = await getEvent({id})
        if (res.statusCode == 200) {
            dispatch({action: EventAvailabilityActions.SET_EVENT, value: res.event})
        }
    }



    const { id } = useParams()

    useEffect(() => {
        if (id) {
            fetchEvent(id)
        }
    }, [id])



    return (
        <ViewEventSections model={state} handleEvent={dispatch} />
    )
}