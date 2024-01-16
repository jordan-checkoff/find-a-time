import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import Event, { Calendar } from "../../interfaces/Event";
import dayjs from "dayjs";

const EventContext = createContext<EventContextInterface>({
    event: new Event(),
    updateAvailability: () => {},
    timezone: dayjs.tz.guess(),
    setTimezone: () => {},
    calendar: new Calendar([], 0, dayjs.tz.guess())
})

interface props {
    children: React.ReactNode
    id: string
}

interface EventContextInterface {
    event: Event,
    updateAvailability: (datetimes: number[], adding: boolean, user: string) => void
    timezone: string,
    setTimezone: Dispatch<SetStateAction<string>>
    calendar: Calendar
}

export const EventProvider = ({children, id}: props) => {

    const [event, setEvent] = useState(new Event())
    const [timezone, setTimezone] = useState(dayjs.tz.guess())

    const fetchData = async (id: string) => {
        const newData = new Event()
        await newData.from_id(id)
        setEvent(newData)
    }

    useEffect(() => {
        fetchData(id)
    }, [id])

    const updateAvailability = (datetimes: number[], adding: boolean, user: string) => {
        setEvent(x => {
            const newEvent = x.clone()
            newEvent.update_availability(datetimes, adding, user)
            return newEvent
        })
    }

    const calendar = event.get_calendar(timezone)

    if (event.id == "") {
        return <p>Loading...</p>
    }

    return (
        <EventContext.Provider value={{event, timezone, updateAvailability, setTimezone, calendar}}>
            {children}
        </EventContext.Provider>
    )
}

export const useEvent = () => {
    const ec = useContext(EventContext)

    return ec
}