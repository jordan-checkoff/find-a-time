import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { viewEventApi } from "../apiCalls";
import Calendar from "../components/Calendar";
import { Event } from "../interfaces";
import ViewCalendar from "../components/ViewCalendar";
import EditCalendar from "../components/EditCalendar";
import { useForm, SubmitHandler } from "react-hook-form"

interface FormData {
    user: string
}

export default function ViewEvent() {

    const { id } = useParams()

    const [eventData, setEventData] = useState<Event>()
    const [user, setUser] = useState<string>("")

    const { register, handleSubmit } = useForm<FormData>()

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

    const onSubmit: SubmitHandler<FormData> = (data) => {
        setUser(data.user)
        if (!eventData?.availability_by_user.has(data.user)) {
            const dupe = {...eventData}
            dupe.availability_by_user?.set(data.user, new Set())
        }
    }

    if (eventData) {
        return (
            <div>
                <h1>{eventData.title}</h1>
                <ViewCalendar data={eventData} />
                {user
                    ? <div>
                        <p>User: {user}</p>
                        <EditCalendar data={eventData} user={user} setData={setEventData}  />
                        <button onClick={() => setUser("")}>Sign out</button>
                    </div>
                    : <div>
                        <p>Enter your username to set your availability</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input {...register("user")} />
                            <input type="submit" />
                        </form>
                    </div>
                }
            </div>
        )
    } else {
        return <p>Loading...</p>
    }
}