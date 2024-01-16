import { Dispatch, SetStateAction, createContext, useContext } from "react";
import Event from "../../interfaces/Event";

interface props {
    children: React.ReactNode
}

const EventContext = createContext<[Event, Dispatch<SetStateAction<Event>>]>([new Event(), () => {}])


interface props {
    children: React.ReactNode
    event: Event,
    setEvent: Dispatch<SetStateAction<Event>>
}

export const EventProvider = ({children, event, setEvent}: props) => {
    return (
        <EventContext.Provider value={[event, setEvent]}>
            {children}
        </EventContext.Provider>
    )
}

export const useEvent = () => {
    return useContext(EventContext)[0]
}

export const useEventUpdate = () => {
    return useContext(EventContext)[1]
}