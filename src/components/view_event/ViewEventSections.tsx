import MVCInterface from "../../interfaces/MVCInterface";
import EventAvailabilityInterface, { EventAvailabilityPages } from "../../interfaces/EventAvailabilityInterface";
import { EventAvailabilityActions } from "./EventAvailabilityController";
import { ReducerAction } from "../../interfaces/interfaces";
import { Tabs, Tab } from "@mui/material";
import ViewCalendar from "./ViewCalendar";
import LoginForm from "./LoginForm";
import EditCalendar from "./EditCalendar";
import { Dayjs } from "dayjs";



export default function ViewEventSections({model, handleEvent}: MVCInterface<EventAvailabilityInterface, EventAvailabilityActions>) {

    const setPage = (x: EventAvailabilityPages) => {
        handleEvent({action: EventAvailabilityActions.SET_PAGE, value: x})
    }

    const setUser = (x: string | null) => {
        handleEvent({action: EventAvailabilityActions.SET_USER, value: x})
    }

    const updateAvailability = (x: number, y: boolean) => {
        handleEvent({action: EventAvailabilityActions.UPDATE_AVAILABILITY, value: {datetime: x, selected: y}})
    }

    if (model.loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Tabs value={model.page} onChange={(e, x) => setPage(x)} variant="fullWidth">
                <Tab label="View Availability" value={EventAvailabilityPages.VIEW} />
                <Tab label="Edit Availability" value={EventAvailabilityPages.EDIT} />
            </Tabs>

            <div className="p-4">
                {model.page == EventAvailabilityPages.VIEW ?
                    <ViewCalendar data={model.event} timezone={model.timezone} />
                    : model.user ?
                        <EditCalendar data={model.event} user={model.user} setData={updateAvailability} timezone={model.timezone} setUser={setUser}  />
                        : <LoginForm setUser={setUser} />
                }
            </div>

        </>
    )
}