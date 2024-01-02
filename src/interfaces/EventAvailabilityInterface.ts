import { Event } from "./interfaces"

export enum EventAvailabilityPages {
    VIEW,
    EDIT
}

export default interface EventAvailabilityInterface {
    loading: boolean
    event: Event,
    page: EventAvailabilityPages
    user: string | null,
    timezone: string
}