import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { viewEventApi } from "../utils/apiCalls";
import { Event } from "../interfaces/interfaces";
import ViewCalendar from "../components/view_event/ViewCalendar";
import EditCalendar from "../components/view_event/EditCalendar";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Tabs, Tab } from "@mui/material";
import dayjs from "dayjs";
import TimezoneInput from "../components/common/TimezoneInput";
import LoginForm from "../components/view_event/LoginForm";
import ViewAvailability from "../components/view_event/ViewAvailability";
import EditAvailablity from "../components/view_event/EditAvailability";

interface FormData {
    user: string
}

export default function ViewEvent() {

    const { id } = useParams()

    const [eventData, setEventData] = useState<Event>()
    const [timezone, setTimezone] = useState(dayjs.tz.guess())
    const [value, setValue] = useState<number>(0);

    useEffect(() => {
        const callViewEventApi = async () => {
            if (id) {
                const event = await viewEventApi(id)
                if (event) {
                    setEventData(event)
                }
            }
        }
        callViewEventApi()
    }, [id])

    if (eventData) {
        return (
            <>
                <Tabs value={value} onChange={(e, x) => setValue(x)} variant="fullWidth">
                    <Tab label="View Availability" value={0} />
                    <Tab label="Edit Availability" value={1} />
                </Tabs>

                {value == 0 ?
                    <ViewAvailability data={eventData} timezone={timezone} />
                    :
                    <EditAvailablity data={eventData} timezone={timezone} setEventData={setEventData} />
                }

            </>
        )
    } else {
        return <p>Loading...</p>
    }
}