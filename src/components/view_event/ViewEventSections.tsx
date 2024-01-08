import MVCInterface from "../../interfaces/MVCInterface";
import EventAvailabilityInterface, { EventAvailabilityPages } from "../../interfaces/EventAvailabilityInterface";
import { EventAvailabilityActions } from "./EventAvailabilityController";
import { ReducerAction } from "../../interfaces/interfaces";
import { Tabs, Tab, Dialog } from "@mui/material";
import ViewCalendar from "./ViewCalendar";
import LoginForm from "./LoginForm";
import EditCalendar from "./EditCalendar";
import { Dayjs } from "dayjs";
import EditCalendarController, { EditCalendarActions } from "./EditCalendarController";
import TimezoneInput from "../common/TimezoneInput";
import Button from "../common/Button";
import { useState } from "react";

interface props extends MVCInterface<EventAvailabilityInterface, EventAvailabilityActions> {
    handleEvent2: any,
    model2: any
}



export default function ViewEventSections({model, handleEvent, model2, handleEvent2}: props) {

    const [copied, setCopied] = useState(false)

    const setPage = (x: EventAvailabilityPages) => {
        handleEvent({action: EventAvailabilityActions.SET_PAGE, value: x})
    }

    const setUser = (x: string | null) => {
        handleEvent({action: EventAvailabilityActions.SET_USER, value: x})
    }

    const setTimezone = (x: string) => {
        handleEvent({action: EventAvailabilityActions.SET_TIMEZONE, value: x})
    }

    const updateCalendar = (x: EditCalendarActions, y: any, z: any) => {
        handleEvent2({action: x, value: [y, z]})
    }

    const addToClipboard = () => {
        window.navigator.clipboard.writeText(window.location.href);
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (model.loading) {
        return <p>Loading...</p>
    }

    if (!model.event || !model.calendar) {
        return <p>Error</p>
    }

    if (window.innerWidth > 1000) {
        return (
            <div className="p-8">
            <p className="text-2xl font-bold">{model.event.title}</p>

            <div className="grid grid-cols-2 gap-4">

                <div>
                    <div className="mb-6 mt-6">
                        {copied && <p className="text-xs">Copied to clipboard</p>}
                        <Button text={"Share Event"} onClick={addToClipboard} />
                    </div>
                    {model.user ?
                            <EditCalendar data={model.event} updateCalendar={updateCalendar} model={model2} handleEvent={() => {}} user={model.user} calendar={model.calendar} />
                            : <div className="px-12"><LoginForm setUser={setUser} /></div>
                    }
                </div>
                <div>
                    <div className="mb-6">
                        <TimezoneInput value={model.calendar.timezone} onChange={setTimezone} />
                    </div>
                    <ViewCalendar data={model.event} calendar={model.calendar} />
                </div>
            </div>
            </div>
        )
    }


    return (
        <>
            <Tabs value={model.page} onChange={(e, x) => setPage(x)} style={{borderTop: "1px solid lightgray"}} variant="fullWidth" TabIndicatorProps={{style: {background:'red', height: 3}}}>
                <Tab label="View Availability" value={EventAvailabilityPages.VIEW} style={{ color: 'black', backgroundColor: "#EEE" }} />
                <Tab label="Edit Availability" value={EventAvailabilityPages.EDIT} style={{ color: 'black', backgroundColor: "#EEE" }} />
            </Tabs>

            <p className="text-2xl mt-2 pt-4 px-4 font-bold">{model.event.title}</p>

            <div className="p-4 pt-2">
                <div className="mb-2">
                    <TimezoneInput value={model.calendar.timezone} onChange={setTimezone} />
                </div>
                <div className="mb-4">
                    {copied && <p className="text-xs">Copied to clipboard</p>}
                    <Button text={"Share Event"} onClick={addToClipboard} />
                </div>

                {model.page == EventAvailabilityPages.VIEW ?
                    <ViewCalendar data={model.event} calendar={model.calendar} />
                    : model.user ?
                        <EditCalendar data={model.event} updateCalendar={updateCalendar} model={model2} handleEvent={() => {}} user={model.user} calendar={model.calendar} />
                        : <LoginForm setUser={setUser} />
                }
            </div>

        </>
    )
}