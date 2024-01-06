import dayjs, { Dayjs } from "dayjs"
import { getEvent, updateAvailability } from "../utils/api_calls";
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

    get_calendar() {
        return new Calendar(this.start_times, this.num_blocks)
    }


    send_update(user: string) {
        const x = this.availability_by_user.get(user)
        if (x) {
            updateAvailability(this.id, user, x)
        }
    }

}



export class Calendar {
    timezone: string = dayjs.tz.guess()
    start_times: Array<Dayjs> = []
    num_blocks: number = -1

    dates: Dayjs[] = []
    top_blocks: Dayjs[] = []
    bottom_blocks: Dayjs[] = []

    constructor(start_times: Array<Dayjs>, num_blocks: number) {
        this.start_times = start_times
        this.num_blocks = num_blocks
        this.create_calendar()
    }

    create_calendar() {
        this.dates = []
        this.top_blocks = []
        this.bottom_blocks = []

        const start = this.start_times[0].tz(this.timezone).utcOffset() != 0 ? this.start_times[0].tz(this.timezone) : this.start_times[0].utc()

        for (let j=0; j < this.num_blocks; j++) {
            const datetime = start.add(30*j, "minute")
            if (datetime.isSame(start, "date")) {
                this.bottom_blocks.push(datetime)
            } else {
                this.top_blocks.push(datetime)
            }
        }

        for (let i=0; i < this.start_times.length; i++) {
            const start = this.start_times[i].tz(this.timezone).utcOffset() != 0 ? this.start_times[i].tz(this.timezone) : this.start_times[i].utc()
            if (this.top_blocks.length == 0) {
                this.dates.push(start)
            } else {
                if (this.dates[-1] != start) {
                    this.dates.push(start)
                }
                this.dates.push(start.add(1, "day"))
            }
        }

    }

    update_timezone(timezone: string): void {
        this.timezone = timezone
        this.create_calendar()
    }

    get_dates() {
        return this.dates.map((d) => d.format("M/D/YY"))
    }

    get_top_blocks() {
        return this.top_blocks.map((t) => t.format("h:mm A"))
    }

    get_bottom_blocks() {
        return this.bottom_blocks.map((t) => t.format("h:mm A"))
    }

    get_datetime(row: number, col: number) {
        let time;
        if (row < this.top_blocks.length) {
            time = this.top_blocks[row]
        } else {
            time = this.bottom_blocks[row - this.top_blocks.length]
        }
        return dayjs(this.dates[col]).hour(time.hour()).minute(time.minute()).valueOf()
    }

}