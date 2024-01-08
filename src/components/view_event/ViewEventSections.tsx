import MVCInterface from "../../interfaces/MVCInterface";
import EventAvailabilityInterface, { EventAvailabilityPages } from "../../interfaces/EventAvailabilityInterface";
import { EventAvailabilityActions } from "./EventAvailabilityController";
import { ReducerAction } from "../../interfaces/interfaces";
import { Tabs, Tab } from "@mui/material";
import ViewCalendar from "./ViewCalendar";
import LoginForm from "./LoginForm";
import EditCalendar from "./EditCalendar";
import { Dayjs } from "dayjs";
import EditCalendarController, { EditCalendarActions } from "./EditCalendarController";
import TimezoneInput from "../common/TimezoneInput";



export default function ViewEventSections({model, handleEvent}: MVCInterface<EventAvailabilityInterface, EventAvailabilityActions>) {

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
        handleEvent({action: EventAvailabilityActions.EDIT_CALENDAR, value: [x, y, z]})
    }

    if (model.loading) {
        return <p>Loading...</p>
    }

    if (!model.event || !model.calendar) {
        return <p>Error</p>
    }

    if (window.innerWidth > 1000) {
        return (
            <div className="grid grid-cols-2 gap-4 p-8 items-center">
                {model.user ?
                        <EditCalendar data={model.event} updateCalendar={updateCalendar} model={model.calendarState} handleEvent={() => {}} user={model.user} calendar={model.calendar} />
                        : <div className="px-12"><LoginForm setUser={setUser} /></div>
                }
                <div>
                    <div className="mb-4">
                        <TimezoneInput value={model.calendar.timezone} onChange={setTimezone} />
                    </div>
                    <ViewCalendar data={model.event} calendar={model.calendar} />
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

            <div className="p-4">
                <div className="mb-4">
                    <TimezoneInput value={model.calendar.timezone} onChange={setTimezone} />
                </div>

                {model.page == EventAvailabilityPages.VIEW ?
                    <ViewCalendar data={model.event} calendar={model.calendar} />
                    : model.user ?
                        <EditCalendar data={model.event} updateCalendar={updateCalendar} model={model.calendarState} handleEvent={() => {}} user={model.user} calendar={model.calendar} />
                        : <LoginForm setUser={setUser} />
                }
            </div>

        </>
    )
}