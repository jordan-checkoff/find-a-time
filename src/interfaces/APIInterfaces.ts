import Event from "./Event"

interface Response {
    statusCode: number
}


export interface CreateEventRequest {
    title: string,
    start_times: Array<number>,
    num_blocks: number
}

export interface CreateEventResponse extends Response {
    id: string | null
}


export interface GetEventRequest {
    id: string
}

export interface GetEventResponse extends Response {
    id: string,
    title: string,
    start_times: number[],
    num_blocks: number,
    availability_by_user: any,
    availability_by_time: any
}