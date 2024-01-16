import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Event from "../interfaces/Event";
import { EventProvider } from "../components/view_event/EventContext";
import EventHeader from "../components/view_event/EventHeader";
import EventBody from "../components/view_event/EventBody";


export default function ViewEventPage() {

    const { id } = useParams()

    if (!id) {
        return <p>Loading...</p>
    }

    return (
        <EventProvider id={id}>
            <EventHeader />
            <EventBody />
        </EventProvider>
    )
}