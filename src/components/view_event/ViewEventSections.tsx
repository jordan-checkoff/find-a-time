import MVCInterface from "../../interfaces/MVCInterface";
import EventAvailabilityInterface, { EventAvailabilityPages } from "../../interfaces/EventAvailabilityInterface";
import { EventAvailabilityActions } from "./EventAvailabilityController";
import { ReducerAction } from "../../interfaces/interfaces";
import { Tabs, Tab } from "@mui/material";
import ViewCalendar from "./ViewCalendar";
import LoginForm from "./LoginForm";
import EditCalendar from "./EditCalendar";
import { Dayjs } from "dayjs";
import EditCalendarController from "./EditCalendarController";
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

    if (model.loading) {
        return <p>Loading...</p>
    }

    if (!model.event || !model.calendar) {
        return <p>Error</p>
    }

    return (
        <>
            <Tabs value={model.page} onChange={(e, x) => setPage(x)} style={{borderTop: "1px solid lightgray"}} variant="fullWidth" TabIndicatorProps={{style: {background:'red', height: 3}}}>
                <Tab label="View Availability" value={EventAvailabilityPages.VIEW} style={{ color: 'black', backgroundColor: "#EEE" }} />
                <Tab label="Edit Availability" value={EventAvailabilityPages.EDIT} style={{ color: 'black', backgroundColor: "#EEE" }} />
            </Tabs>

            <div className="p-4">
                <TimezoneInput value={model.calendar.timezone} onChange={setTimezone} />
                {model.page == EventAvailabilityPages.VIEW ?
                    <ViewCalendar data={model.event} calendar={model.calendar} />
                    : model.user ?
                        <EditCalendarController data={model.event} user={model.user} calendar={model.calendar} />
                        : <LoginForm setUser={setUser} />
                }
            </div>

        </>
    )
}