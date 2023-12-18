
import { Event } from "./interfaces";

const endpoint = "https://mcyvefz876.execute-api.us-east-2.amazonaws.com/prod/";

export async function createEventApi(title: string, start_date: string, end_date: string, start_time: string, end_time: string) {
    const event = {
        title,
        start_date,
        end_date,
        start_time,
        end_time,
    }

    let output = null

    await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
            "Content-Type": "application/json",
        },
    }).then(async res => {
        output = await res.json()
    }).catch(e => {
        console.log(e)
        return null;
    });

    return output
}


export async function viewEventApi(id: string) {

    const res = await fetch(endpoint + id).then(async res => {
        const output = await res.json()

        const user_map = new Map()
        Object.keys(output.availability_by_user).forEach(key => {
            user_map.set(key, new Set(output.availability_by_user[key]))
        })
        output.availability_by_user = user_map

        const time_map = new Map()
        Object.keys(output.availability_by_time).forEach(key => {
            time_map.set(key, new Set(output.availability_by_time[key]))
        })
        output.availability_by_time = time_map

        return output as Event
    }).catch(e => {
        console.log(e)
        return null;
    });

    return res

}