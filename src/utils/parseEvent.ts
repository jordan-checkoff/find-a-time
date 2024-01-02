import { Event } from "../interfaces/interfaces";
import dayjs from "dayjs";

const KEYS = ["id", "title", "start_times", "num_blocks", "availability_by_user", "availability_by_time"]

export default function parseEvent(obj: any): Event | null {
    for (let i=0; i < KEYS.length; i++) {
        if (!(KEYS[i] in obj)) {
            return null
        }
    }
    
    const start_times = obj.start_times.map((t: number) => dayjs.utc(t).local())

    const availability_by_user = new Map()
    Object.keys(obj.availability_by_user).forEach(key => {
        availability_by_user.set(key, new Set(obj.availability_by_user[key]))
    })

    const availability_by_time = new Map()
    Object.keys(obj.availability_by_time).forEach(key => {
        availability_by_time.set(parseInt(key), new Set(obj.availability_by_time[key]))
    })

    return {title: obj.title, id: obj.id, start_times, availability_by_user, availability_by_time, num_blocks: obj.num_blocks}
}



export const blankEvent = {
    title: "",
    id: "",
    start_times: [],
    availability_by_user: new Map(),
    availability_by_time: new Map(),
    num_blocks: 0
}