import MVCInterface from "../../interfaces/MVCInterface";
import EventAvailabilityInterface, { EventAvailabilityPages } from "../../interfaces/EventAvailabilityInterface";
// import { EventAvailabilityActions } from "./EventViewController";
import { ReducerAction } from "../../interfaces/interfaces";
import { Tabs, Tab, Dialog } from "@mui/material";
import ViewCalendar from "./ViewCalendar";
import LoginForm from "./LoginForm";
import EditCalendarNavigator from "./EditCalendarNavigator";
import dayjs, { Dayjs } from "dayjs";
import EditCalendarController, { EditCalendarActions } from "./EditCalendarController";
import TimezoneInput from "../common/TimezoneInput";
import Button from "../common/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Event from "../../interfaces/Event";

// interface props extends MVCInterface<EventAvailabilityInterface, EventAvailabilityActions> {
//     handleEvent2: any,
//     model2: any
// }



export default function EventView() {

    const [event, setEvent] = useState<Event | null>(null)
    const [timezone, setTimezone] = useState<string>(dayjs.tz.guess())
    const [copied, setCopied] = useState(false)
    const [page, setPage] = useState(0)
    const [selected, setSelected] = useState(null)

    const { id } = useParams()

    const fetchEvent = async (id: string) => {
        const newEvent = new Event()
        await newEvent.from_id(id)
        setEvent(newEvent)
    }

    useEffect(() => {
        if (id) {
            fetchEvent(id)
        }
    }, [id])


    const addToClipboard = () => {
        window.navigator.clipboard.writeText(window.location.href);
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const updateAvailability = (user: string, datetimes: number[], adding: boolean) => {
        if (event) {
            const newEvent = event.clone()
            newEvent.update_availability(datetimes, adding, user)
            setEvent(newEvent)
        }
    }

    useEffect(() => {
        console.log('EVENT')
    }, [event])

    if (!event) {
        return <p>Loading...</p>
    }


    const calendar = event.get_calendar(timezone)

    if (window.innerWidth > 1000) {
        return (
            <>
                <div className="bg-gray-100 flex justify-between px-8 py-4">
                    <p className="text-2xl self-center">{event.title}</p>
                    <div className="flex items-end gap-4">
                         <TimezoneInput value={timezone} onChange={(x) => setTimezone(x)} />
                         <div className="w-40">
                             {copied && <p className="text-xs">Copied to clipboard</p>}
                             <Button text={"Share Event"} onClick={addToClipboard} />
                         </div>
                     </div>
                 </div>
                <div className="p-8 grid grid-cols-2 gap-4">
                    <div>
                        <EditCalendarNavigator data={event} calendar={calendar} updateAvailability={updateAvailability} />
                    </div>
                    <div>
                        <p className="mb-8 text-xl font-bold">View Group's Availability</p>
                        <ViewCalendar data={event} calendar={calendar} setSelected={setSelected} />
                    </div>
                </div>
            </>
        )
    }



    return (
        <>
            <div className="py-4 px-8">
                    <p className="text-2xl mb-6">{event.title}</p>

                    <div className="mb-2">
                        <TimezoneInput value={timezone} onChange={setTimezone} fullWidth={true} />
                    </div>

                    <div className="mb-2">
                        {copied && <p className="text-xs">Copied to clipboard</p>}
                        <Button text={"Share Event"} onClick={addToClipboard} />
                    </div>
            </div>
            <Tabs value={page} onChange={(e, x) => setPage(x)} style={{borderTop: "1px solid lightgray"}} variant="fullWidth" TabIndicatorProps={{style: {background:'red', height: 3}}}>
                <Tab label="Group Availability" value={EventAvailabilityPages.VIEW} style={{ color: 'black', backgroundColor: "#EEE" }} />
                <Tab label="Edit Availability" value={EventAvailabilityPages.EDIT} style={{ color: 'black', backgroundColor: "#EEE" }} />
            </Tabs>

            <div className="p-4">

                {page == EventAvailabilityPages.VIEW ?
                    <ViewCalendar data={event} calendar={calendar} />
                    : <EditCalendarNavigator data={event} calendar={calendar} updateAvailability={updateAvailability} />
                }
            </div>

        </>
    )
}