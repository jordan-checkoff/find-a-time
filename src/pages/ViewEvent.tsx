import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { viewEventApi } from "../apiCalls";
import Calendar from "../components/Calendar";
import { Event } from "../interfaces";

export default function ViewEvent() {

    const { id } = useParams()

    const [eventData, setEventData] = useState<Event>()
    const [edit, setEdit] = useState<boolean>(false)
    const [user, setUser] = useState<string>("")
    const [userField, setUserField] = useState<string>("")
    const [newAvailability, setNewAvailability] = useState<Set<string>>(new Set())

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
                <Calendar data={eventData} />
                {user
                    ? <div>
                        <p>User: {user}</p>
                        <button onClick={() => setUser("")}>Sign out</button>
                    </div>
                    : <div>
                        <p>Enter your username to set your availability</p>
                        <input value={userField} onChange={e => setUserField(e.target.value)} />
                        <button onClick={() => setUser(userField)}>Log in</button>
                    </div>
                }
            </div>
        )
    } else {
        return <p>Loading...</p>
    }
}