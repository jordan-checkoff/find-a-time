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
    const [availability, setAvailability] = useState<any>(1)

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
            <div>
                <div className="bg-gray-100 flex justify-between px-8 py-4">
                    <p className="text-2xl self-center">{model.event.title}</p>
                    <div className="flex items-end gap-4">
                        <TimezoneInput value={model.calendar.timezone} onChange={setTimezone} />
                        <div className="w-40">
                            {copied && <p className="text-xs">Copied to clipboard</p>}
                            <Button text={"Share Event"} onClick={addToClipboard} />
                        </div>
                    </div>
                </div>
            <div className="p-8 grid grid-cols-2 gap-4">
                <div>
                    {availability ?
                         <div>
                            <p className="text-lg mb-4">{availability.datetime}</p>
                            <p className="mb-4">{availability.percentage} users available</p>
                            {availability.people?.map((x: any) => <p>{x}</p>)}
                         </div>
                        :
                        model.user ?
                        <>
                                            <p className="mb-8 text-xl font-bold">Edit Your Availability</p>
                            <EditCalendar data={model.event} updateCalendar={updateCalendar} model={model2} handleEvent={() => {}} user={model.user} calendar={model.calendar} />
                                            
                                            </>
                            : <div className="px-12"><p className="text-lg mb-4">Log in to edit your availability</p><LoginForm setUser={setUser} /></div>
                    }
                

                </div>
                <div>
                    <p className="mb-8 text-xl font-bold">View Group's Availability</p>
                    <ViewCalendar data={model.event} calendar={model.calendar} onHover={setAvailability} />
                </div>
            </div>
            </div>
        )
    }


    return (
        <>
            <div className="py-4 px-8">
                    <p className="text-2xl mb-6">{model.event.title}</p>

                    <div className="mb-2">
                        <TimezoneInput value={model.calendar.timezone} onChange={setTimezone} fullWidth={true} />
                    </div>

                    <div className="mb-2">
                        {copied && <p className="text-xs">Copied to clipboard</p>}
                        <Button text={"Share Event"} onClick={addToClipboard} />
                    </div>
            </div>
            <Tabs value={model.page} onChange={(e, x) => setPage(x)} style={{borderTop: "1px solid lightgray"}} variant="fullWidth" TabIndicatorProps={{style: {background:'red', height: 3}}}>
                <Tab label="Group Availability" value={EventAvailabilityPages.VIEW} style={{ color: 'black', backgroundColor: "#EEE" }} />
                <Tab label="Edit Availability" value={EventAvailabilityPages.EDIT} style={{ color: 'black', backgroundColor: "#EEE" }} />
            </Tabs>

            <div className="p-4">

                {model.page == EventAvailabilityPages.VIEW ?
                    <ViewCalendar data={model.event} calendar={model.calendar} />
                    : model.user ?
                        <EditCalendar data={model.event} updateCalendar={updateCalendar} model={model2} handleEvent={() => {}} user={model.user} calendar={model.calendar} />
                        : <>
                            <p className="text-lg mb-4">Log in to edit your availability</p>
                            <LoginForm setUser={setUser} />
                        </>
                }
            </div>

        </>
    )
}