import { Tabs, Tab } from "@mui/material"
import Button from "../common/Button"
import ViewCalendar from "./ViewCalendar"
import EditCalendarNavigator from "./EditCalendarNavigator"
import { useState } from "react"
import { EventAvailabilityPages } from "../../interfaces/EventAvailabilityInterface"
import Event from "../../interfaces/Event"
import { useEvent, useEventUpdate } from "./EventContext"


interface props {
    timezone: string
}

export default function EventBody({timezone}: props) {

    const [page, setPage] = useState(0)
    const [start, setStart] = useState(0)
    const [user, setUser] = useState("")
    const [selected, setSelected] = useState(null)

    const event = useEvent()
    const updateEvent = useEventUpdate()

    const updateAvailability = (user: string, datetimes: number[], adding: boolean) => {
        if (event) {
            const newEvent = event.clone()
            newEvent.update_availability(datetimes, adding, user)
            updateEvent(newEvent)
        }
    }

    const calendar = event.get_calendar(timezone)
    const numCols = window.innerWidth > 768 ? calendar.dates.length : Math.floor((window.innerWidth - 100) / 64)

    if (window.innerWidth < 768) {
        return (
            <>
                <Tabs value={page} onChange={(e, x) => setPage(x)} style={{borderTop: "1px solid lightgray"}} variant="fullWidth" TabIndicatorProps={{style: {background:'red', height: 3}}}>
                    <Tab label="Group Availability" value={EventAvailabilityPages.VIEW} style={{ color: 'black', backgroundColor: "#EEE" }} />
                    <Tab label="Edit Availability" value={EventAvailabilityPages.EDIT} style={{ color: 'black', backgroundColor: "#EEE" }} />
                </Tabs>

                <div className="p-5 w-full">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <Button onClick={() => setStart(start - 1)} text="<" disabled={start == 0} />
                        <Button onClick={() => setStart(start + 1)} text=">" disabled={start + numCols >= calendar.dates.length} />
                    </div>
                </div>

                <div className="p-4">
                    {page == EventAvailabilityPages.VIEW ?
                        <ViewCalendar data={event} calendar={calendar} start={start} numCols={numCols} />
                        : <EditCalendarNavigator selected={selected} user={user} setUser={setUser} start={start} numCols={numCols} data={event} calendar={calendar} updateAvailability={updateAvailability} />
                    }
                </div>
            </>
        )
    }

    return (
        <div className="p-4 p-8 md:grid grid-cols-2 gap-4 hidden">
            <EditCalendarNavigator selected={selected} user={user} setUser={setUser} data={event} calendar={calendar} updateAvailability={updateAvailability} start={start} numCols={numCols} />
            <ViewCalendar start={start} numCols={numCols} data={event} calendar={calendar} setSelected={setSelected} />
        </div>
    )
}