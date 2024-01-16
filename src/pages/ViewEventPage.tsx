import EventView from "../components/view_event/EventView";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Event from "../interfaces/Event";
import { EventProvider } from "../components/view_event/EventContext";


export default function ViewEventPage() {

    const { id } = useParams()
    const [data, setData] = useState<Event>(new Event())

    const fetchData = async (id: string) => {
        const newData = new Event()
        await newData.from_id(id)
        setData(newData)
    }

    useEffect(() => {
        if (id) {
            fetchData(id)
        }
    }, [id])

    if (data.id == "") {
        return <p>Loading...</p>
    }

    return (
        <EventProvider event={data} setEvent={setData}>
            <EventView />
        </EventProvider>
    )
}