import dayjs, { Dayjs } from "dayjs"
import { getEvent } from "../utils/api_calls";
import { GetEventResponse } from "./APIInterfaces";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc)
dayjs.extend(timezone)

interface DateInfo {
    date: Dayjs
    top_datetimes: (Dayjs | null)[]
    bottom_datetimes: (Dayjs | null)[]
    connected: boolean
}


export default class Event {
    id: string = "";
    title: string = "";
    start_times: Array<Dayjs> = [];
    num_blocks: number = 0;
    availability_by_user: Map<string, Set<number>> = new Map();
    availability_by_time: Map<number, Set<string>> = new Map();

    async from_id(id: string) {
       await getEvent(id).then((event) => {
            this.parse_event(event)
        }).catch((e) => {
            console.log(e)
        })
    }

    parse_event(event: GetEventResponse) {
        this.id = event.id
        this.title = event.title
        this.num_blocks = event.num_blocks
        this.start_times = event.start_times.map((t: number) => dayjs.utc(t).local())

        Object.keys(event.availability_by_user).forEach(key => {
            this.availability_by_user.set(key, new Set(event.availability_by_user[key]))
        })
        Object.keys(event.availability_by_time).forEach(key => {
            this.availability_by_time.set(parseInt(key), new Set(event.availability_by_time[key]))
        })
    }

    update_availability(user: string, selected: boolean, datetime: number) {
        if (!this.availability_by_user.has(user)) {
            this.availability_by_user.set(user, new Set())
        }

        if (selected) {
            this.availability_by_user.get(user)?.add(datetime)
            this.availability_by_time.get(datetime)?.add(user)
        } else {
            this.availability_by_user.get(user)?.delete(datetime)
            this.availability_by_time.get(datetime)?.delete(user)
        }
    }

    get_calendar(timezone: string) {
        dayjs.tz.setDefault(timezone)

        const dates: DateInfo[] = []
        for (let i=0; i < this.start_times.length; i++) {
            const bottom_datetimes = []
            const top_datetimes = []
            const start = this.start_times[i].tz(timezone).utcOffset() != 0 ? this.start_times[i].tz(timezone) : this.start_times[i].utc()

            for (let j=0; j < this.num_blocks; j++) {
                const datetime = start.add(30*j, "minute")
                if (datetime.isSame(start, "date")) {
                    bottom_datetimes.push(datetime)
                } else {
                    top_datetimes.push(datetime)
                }
            }

            if (dates.length == 0 || !dates[dates.length-1].date.isSame(this.start_times[i], "date")) {
                dates.push({
                    date: start.startOf('day'),
                    top_datetimes: Array(top_datetimes.length).fill(null),
                    bottom_datetimes: bottom_datetimes,
                    connected: false
                })
                if (dates.length >= 2 && dates[dates.length-2].date.add(1, "day").isSame(dates[dates.length-1].date)) {
                    dates[dates.length-2].connected = true
                }
            } else {
                dates[dates.length-1].bottom_datetimes = bottom_datetimes
                dates[dates.length-1].connected = true
            }

            if (top_datetimes.length > 0) {
                dates[dates.length-1].connected = true
                dates.push({
                    date: start.add(1, "day").startOf('day'),
                    top_datetimes: top_datetimes,
                    bottom_datetimes: Array(bottom_datetimes.length).fill(null),
                    connected: false
                })
            }
        }

        const bottom_datetimes = dates[0].bottom_datetimes
        const top_datetimes = dates.length > 0 ? dates[1].top_datetimes : dates[0].top_datetimes

        return {dates, top_datetimes, bottom_datetimes}
    }
}