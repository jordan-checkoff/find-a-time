import dayjs, { Dayjs } from "dayjs"
import { getEvent, updateAvailability } from "../utils/api_calls";
import { GetEventResponse } from "./APIInterfaces";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc)
dayjs.extend(timezone)


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

    update_availability(datetimes: number[], adding: boolean, user: string) {
        if (!this.availability_by_user.has(user)) {
            this.availability_by_user.set(user, new Set())
        }

        if (adding) {
            datetimes.forEach(x => {
                if (this.availability_by_time.has(x)) {
                    this.availability_by_user.get(user)?.add(x)
                    this.availability_by_time.get(x)?.add(user)
                }
            })
        } else {
            datetimes.forEach(x => {
                this.availability_by_user.get(user)?.delete(x)
                this.availability_by_time.get(x)?.delete(user)
            })
        }

        const x = this.availability_by_user.get(user)
        if (x) {
            updateAvailability(this.id, user, x)
        }
    }

    get_calendar(timezone: string) {
        return new Calendar(this.start_times, this.num_blocks, timezone)
    }

    clone() {
        const event = new Event()
        event.id = this.id
        event.title = this.title
        event.start_times = this.start_times
        event.num_blocks = this.num_blocks
        event.availability_by_user = this.availability_by_user
        event.availability_by_time = this.availability_by_time

        return event
    }

}



export class Calendar {
    start_times: Array<Dayjs> = []
    num_blocks: number = -1

    dates: Dayjs[] = []
    top_blocks: Dayjs[] = []
    bottom_blocks: Dayjs[] = []

    constructor(start_times: Array<Dayjs>, num_blocks: number, timezone: string) {
        this.start_times = start_times
        this.num_blocks = num_blocks
        this.create_calendar(timezone)
    }

    create_calendar(timezone: string) {
        this.dates = []
        this.top_blocks = []
        this.bottom_blocks = []

        const start = dayjs(this.start_times[0]).tz(timezone).utcOffset() != 0 ? dayjs(this.start_times[0]).tz(timezone) : dayjs(this.start_times[0]).utc()

        for (let j=0; j < this.num_blocks; j++) {
            const datetime = start.add(30*j, "minute")
            if (datetime.isSame(start, "date")) {
                this.bottom_blocks.push(datetime)
            } else {
                this.top_blocks.push(datetime)
            }
        }

        for (let i=0; i < this.start_times.length; i++) {
            const start = this.start_times[i].tz(timezone).utcOffset() != 0 ? this.start_times[i].tz(timezone) : this.start_times[i].utc()
            if (this.top_blocks.length == 0) {
                this.dates.push(start)
            } else {
                if (i == 0 || !this.dates[this.dates.length-1].isSame(start, "day")) {
                    this.dates.push(start)
                }
                this.dates.push(start.add(1, "day"))
            }
        }

    }

    get_dates() {
        return this.dates.map((d) => {
            return {day: d.format("ddd"), date: d.format("M/D")}
        })
    }

    get_top_blocks() {
        return this.top_blocks.map((t, i) => i % 2 == 0 ? t.format("h:mm A") : "")
    }

    get_top_times() {
        return this.top_blocks.map((t, i) => i % 2 == 0 ? t.format("h:mm A") : "")
    }

    get_bottom_blocks() {
        return this.bottom_blocks.map((t, i) => i % 2 == 0 ? t.format("h:mm A") : "")
    }

    get_dayjs(row: number, col: number) {
        let time;
        if (row < this.top_blocks.length) {
            time = this.top_blocks[row]
        } else {
            time = this.bottom_blocks[row - this.top_blocks.length]
        }
        return dayjs(this.dates[col]).hour(time.hour()).minute(time.minute())
    }

    get_datetime(row: number, col: number) {
        return this.get_dayjs(row, col).valueOf()
    }

    get_datetimes(startRow: number, endRow: number, startCol: number, endCol: number) {
        const minCol = Math.min(startCol, endCol)
        const maxCol = Math.max(startCol, endCol)
        const minRow = Math.min(startRow, endRow)
        const maxRow = Math.max(startRow, endRow)

        const datetimes = []

        for (let i=0; i < maxRow-minRow+1; i++) {
            for (let j=0; j < maxCol - minCol + 1; j++) {
                datetimes.push(this.get_datetime(minRow+i, minCol+j))
            }
        }
        return datetimes
    }

    get_breaks() {
        const breaks = new Set()
        for (let i=0; i < this.dates.length-1; i++) {
            if (!this.dates[i].add(1, "day").isSame(this.dates[i+1]))  {
                breaks.add(i)
            }
        }

        return breaks
    }

    get_num_cols() {
        return window.innerWidth > 768 ? this.dates.length : Math.floor((window.innerWidth - 100) / 64)
    }

}