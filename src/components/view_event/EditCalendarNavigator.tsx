import { useState } from "react";
import Event from "../../interfaces/Event";
import { Calendar as C } from "../../interfaces/Event";
import EditCalendar from "./EditCalendar";
import LoginForm from "./LoginForm";
import { useEvent } from "./EventContext";

interface props {
    start: number,
    selected: any
}


export default function EditCalendarNavigator({selected, start} : props) {

    const { event, timezone, calendar } = useEvent()
    const numCols = calendar.get_num_cols()

    const [user, setUser] = useState("")

    if (selected) {
        return (
            <div>
                <div className="fixed">
                    <p>{selected.date}</p>
                    <p>{selected.num}/{selected.total}</p>
                    {selected.users && Array.from(selected.users).map((u) => {
                        return <p>{u as string}</p>
                    })}
                </div>
            </div>
        )
    }

    if (user) {
        if (window.innerWidth > 786) {
            return (
                <EditCalendar user={user} data={event} calendar={calendar} startCol={0} endCol={calendar.dates.length} />
            )
        } else {
            return (
                <EditCalendar user={user} data={event} calendar={calendar} startCol={start} endCol={start+numCols} />
            )
        }
    } else {
        return (
            <LoginForm setUser={setUser} />
        )
    }

}




