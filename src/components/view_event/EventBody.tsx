import { Tabs, Tab } from "@mui/material"
import Button from "../common/Button"
import ViewCalendar from "./ViewCalendar"
import EditCalendarNavigator from "./EditCalendarNavigator"
import { useState } from "react"
import { EventAvailabilityPages } from "../../interfaces/EventAvailabilityInterface"
import { useEvent } from "./EventContext"
import NavButtons from "./NavButtons"


export default function EventBody() {

    const [page, setPage] = useState(0)
    const [start, setStart] = useState(0)
    const [selected, setSelected] = useState(null)
    const [user, setUser] = useState("")


    const {calendar} = useEvent()
    const numCols = calendar.get_num_cols()

    if (window.innerWidth < 768) {
        return (
            <>
                <Tabs value={page} onChange={(e, x) => setPage(x)} style={{borderTop: "1px solid lightgray"}} variant="fullWidth" TabIndicatorProps={{style: {background:'red', height: 3}}}>
                    <Tab label="Group Availability" value={EventAvailabilityPages.VIEW} style={{ color: 'black', backgroundColor: "#EEE" }} />
                    <Tab label="Edit Availability" value={EventAvailabilityPages.EDIT} style={{ color: 'black', backgroundColor: "#EEE" }} />
                </Tabs>

                <div className="p-4">
                    {page == EventAvailabilityPages.VIEW ?
                        <ViewCalendar start={start} setStart={setStart} />
                        : <EditCalendarNavigator setStart={setStart} user={user} setUser={setUser} selected={selected} start={start} />
                    }
                </div>
            </>
        )
    }

    return (
        <div className="p-4 p-8 md:grid grid-cols-2 gap-4 hidden">
            <EditCalendarNavigator setStart={setStart} user={user} setUser={setUser} selected={selected} start={start} />
            <ViewCalendar start={start} setStart={setStart} setSelected={setSelected} />
        </div>
    )
}