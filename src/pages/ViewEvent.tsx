import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { viewEventApi } from "../apiCalls";


interface Event {
    id: string,
    start_date: string,
    end_date: string,
    start_time: string,
    end_time: string,
    title: string,
    availability: Map<string, Array<number>>
}

export default function ViewEvent() {

    const { id } = useParams()

    const [eventData, setEventData] = useState<Event>()

    useEffect(() => {
        const callViewEventApi = async () => {
            if (id) {
                const event = await viewEventApi(id)
                if (event) {
                    setEventData(event)
                }
            }
        }
        callViewEventApi()
    }, [id])

    if (eventData) {
        return (
            <div>
                <h1>{eventData.title}</h1>
                <p>Start time: {eventData.start_time}</p>
                <p>End time: {eventData.end_time}</p>
                <p>Start date: {eventData.start_date}</p>
                <p>End date: {eventData.end_date}</p>
            </div>
        )
    } else {
        return <p>Loading</p>
    }
}