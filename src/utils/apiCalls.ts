
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { Event } from "../interfaces/interfaces";
import { CreateEventResponse } from "../interfaces/CreateEventResponse";
import { CreateEventRequest } from "../interfaces/CreateEventRequest";

dayjs.extend(utc)

const endpoint = "https://mcyvefz876.execute-api.us-east-2.amazonaws.com/prod/";

export async function createEventApi(event: CreateEventRequest): Promise<CreateEventResponse> {

    const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
            "Content-Type": "application/json",
        },
    }).then(async res => {
        const json = await res.json()
        return {id: json.id}
    }).catch(e => {
        return {id: "x"};
    });

    return res
}


export async function viewEventApi(id: string) {

    const res = await fetch(endpoint + id).then(async res => {
        const output = await res.json()

        output.start_times = output.start_times.map((t: number) => dayjs.utc(t).local())

        const user_map = new Map()
        Object.keys(output.availability_by_user).forEach(key => {
            user_map.set(key, new Set(output.availability_by_user[key]))
        })
        output.availability_by_user = user_map

        const time_map = new Map()
        Object.keys(output.availability_by_time).forEach(key => {
            time_map.set(parseInt(key), new Set(output.availability_by_time[key]))
        })
        output.availability_by_time = time_map

        return output as Event
    }).catch(e => {
        console.log(e)
        return null;
    });

    return res

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