import Event from "./Event"

export enum EventAvailabilityPages {
    VIEW,
    EDIT
}

export default interface EventAvailabilityInterface {
    loading: boolean
    event: Event | null,
    page: EventAvailabilityPages
    user: string | null,
    timezone: string
}