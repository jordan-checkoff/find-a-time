

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

