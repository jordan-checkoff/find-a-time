import { useState } from "react"
import EditCalendar from "./EditCalendar"
import LoginForm from "./LoginForm"
import { Event } from "../interfaces/interfaces"


interface props {
    data: Event,
    setEventData: React.Dispatch<React.SetStateAction<Event | undefined>>,
    timezone: string
}


export default function EditAvailablity({data, setEventData, timezone}: props) {

    const [user, setUser] = useState<string>("")


    if (user) {
        return (
            <div>
                <p>User: {user}</p>
                <EditCalendar data={data} user={user} setData={setEventData} timezone={timezone}  />
                <button onClick={() => setUser("")}>Sign out</button>
            </div>
        )
    } else {
        return <LoginForm eventData={data} setUser={setUser} />
    }

}