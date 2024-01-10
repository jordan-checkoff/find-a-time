
import Event, { Calendar } from "./Event"

export enum EventAvailabilityPages {
    VIEW,
    EDIT
}

export default interface EventAvailabilityInterface {
    loading: boolean
    event: Event | null,
    page: EventAvailabilityPages
    user: string | null,
    calendar: Calendar | null
}