import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { viewEventApi } from "../apiCalls";


interface Event {
    id: string,
    start_datetime: number,
    end_datetime: number,
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
                <p>{eventData.id}</p>
                <p>{eventData.start_datetime}</p>
                <p>{eventData.end_datetime}</p>
                <p>{eventData.title}</p>
            </div>
        )
    } else {
        return <p>Loading</p>
    }
}