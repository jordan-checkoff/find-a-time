import { Dispatch, SetStateAction, useState } from "react";
import Event from "../../interfaces/Event";
import { Calendar as C } from "../../interfaces/Event";
import EditCalendar from "./EditCalendar";
import LoginForm from "./LoginForm";
import { useEvent } from "./EventContext";
import AvailabilityDetails from "./AvailabilityDetails";

interface props {
    start: number,
    setStart: Dispatch<SetStateAction<number>>,
    selected: any,
    user: string,
    setUser: Dispatch<SetStateAction<string>>
}


export default function EditCalendarNavigator({selected, start, user, setUser, setStart} : props) {

    const { event, timezone, calendar } = useEvent()
    const numCols = calendar.get_num_cols()

    if (selected) {
        return (
            <div>
                <div className="fixed">
                    <AvailabilityDetails date={selected.date} num={selected.num} users={selected.users} total={selected.total} />
                </div>
            </div>
        )
    }

    if (user) {
        if (window.innerWidth > 786) {
            return (
                <EditCalendar user={user} setStart={setStart} data={event} calendar={calendar} startCol={0} endCol={calendar.dates.length} />
            )
        } else {
            return (
                <EditCalendar user={user} setStart={setStart} data={event} calendar={calendar} startCol={start} endCol={start+numCols} />
            )
        }
    } else {
        return (
            <LoginForm setUser={setUser} />
        )
    }

}




