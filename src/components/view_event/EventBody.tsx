import { Tabs, Tab } from "@mui/material"
import Button from "../common/Button"
import ViewCalendar from "./ViewCalendar"
import EditCalendarNavigator from "./EditCalendarNavigator"
import { useState } from "react"
import { EventAvailabilityPages } from "../../interfaces/EventAvailabilityInterface"
import { useEvent } from "./EventContext"


export default function EventBody() {

    const [page, setPage] = useState(0)
    const [start, setStart] = useState(0)
    const [selected, setSelected] = useState(null)


    const {calendar} = useEvent()
    const numCols = calendar.get_num_cols()

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
                        <ViewCalendar start={start} />
                        : <EditCalendarNavigator selected={selected} start={start} />
                    }
                </div>
            </>
        )
    }

    return (
        <div className="p-4 p-8 md:grid grid-cols-2 gap-4 hidden">
            <EditCalendarNavigator selected={selected} start={start} />
            <ViewCalendar start={start} setSelected={setSelected} />
        </div>
    )
}