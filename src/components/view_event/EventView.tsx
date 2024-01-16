import { Tabs, Tab } from "@mui/material";
import ViewCalendar from "./ViewCalendar";
import EditCalendarNavigator from "./EditCalendarNavigator";
import dayjs from "dayjs";
import TimezoneInput from "../common/TimezoneInput";
import Button from "../common/Button";
import { Dispatch, SetStateAction, useState } from "react";
import Event from "../../interfaces/Event";
import { EventAvailabilityPages } from "../../interfaces/EventAvailabilityInterface";
import EventHeader from "./EventHeader";
import { useEvent } from "./EventContext";
import EventBody from "./EventBody";



export default function EventView() {

    const [timezone, setTimezone] = useState<string>(dayjs.tz.guess())

        return (
            <>
                <EventHeader timezone={timezone} setTimezone={setTimezone} />
                <EventBody timezone={timezone} />
            </>
        )
    


}


