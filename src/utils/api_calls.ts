
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { Event } from "../interfaces/interfaces";
import { CreateEventRequest, CreateEventResponse, GetEventRequest, GetEventResponse } from "../interfaces/APIInterfaces";
import parseEvent from "./parseEvent";

dayjs.extend(utc)

const dev = false

const endpoint = "https://mcyvefz876.execute-api.us-east-2.amazonaws.com/prod/";

export async function createEvent(req: CreateEventRequest): Promise<CreateEventResponse> {

    if (dev) {
        return {statusCode: 200, id: "123-456-789"} as CreateEventResponse
    }

    const output: CreateEventResponse = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(req),
        headers: {
            "Content-Type": "application/json",
        },
    }).then(async res => {
        const json = await res.json()
        const id = "id" in json ? json.id : null
        return {statusCode: json.statusCode, id: id}
    }).catch(e => {
        return {statusCode: e.statusCode, id: null}
    });

    return output
}


export async function getEvent(req: GetEventRequest): Promise<GetEventResponse> {

    if (dev) {
        return {statusCode: 200, event: parseEvent({id: "123", title: "event_title", start_times: [1234568885878, 2234588568878], num_blocks: 5, availability_by_user: {}, availability_by_time: {}})} as GetEventResponse
    }

    const output: GetEventResponse = await fetch(endpoint + req.id).then(async res => {
        const json = await res.json()
        const event = parseEvent(json)
        return {statusCode: res.status, event: event}
    }).catch(e => {
        return {statusCode: e.status, event: null};
    });

    return output

}

export async function updateAvailability(id: string, user: string, availability: Set<number>) {
    const update = {
        user,
        availability: Array.from(availability)
    }

    const res = await fetch(endpoint + id, {
        method: "PUT",
        body: JSON.stringify(update),
        headers: {
            "Content-Type": "application/json",
        },
    }).then(async res => {
        const output = await res.text()
        return output
    }).catch(e => {
        console.log(e)
        return null;
    });

    return res
}