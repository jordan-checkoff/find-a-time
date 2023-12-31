
import { ComponentType, ReactElement, useState } from "react"
import { Event } from "../interfaces/interfaces"
import { SetStateAction, Dispatch } from "react"
import { start } from "repl"
import dayjs, { Dayjs } from "dayjs"
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import TimezoneInput from "./common/TimezoneInput"


dayjs.extend(utc)
dayjs.extend(timezone)

interface props {
    start_times: Array<Dayjs>,
    num_blocks: number,
    Cell: ComponentType<datetime>,
    timezone: string
}

interface datetime {
    datetime: Dayjs
}

interface DateInfo {
    date: Dayjs
    top_datetimes: (Dayjs | null)[]
    bottom_datetimes: (Dayjs | null)[]
    connected: boolean
}

export default function Calendar({start_times, num_blocks, Cell, timezone}: props) {


    

    

    dayjs.tz.setDefault(timezone)

    const dates: DateInfo[] = []
    for (let i=0; i < start_times.length; i++) {
        const bottom_datetimes = []
        const top_datetimes = []
        const start = start_times[i].tz(timezone).utcOffset() != 0 ? start_times[i].tz(timezone) : start_times[i].utc()

        for (let j=0; j < num_blocks; j++) {
            const datetime = start.add(30*j, "minute")
            if (datetime.isSame(start, "date")) {
                bottom_datetimes.push(datetime)
            } else {
                top_datetimes.push(datetime)
            }
        }

        if (dates.length == 0 || !dates[dates.length-1].date.isSame(start_times[i], "date")) {
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


    return (
        <div>
            <div className="flex">
                <div className="min-w-20">
                    <p className="text-center">Time</p>
                    {top_datetimes.map(t => <div className="h-8"><p>{t ? t.format("h:mm A") : " "}</p></div>)}
                    <div style={{marginBottom: 20}} />
                    {bottom_datetimes.map(t => <div className="h-8"><p className="relative bottom-3">{t ? t.format("h:mm A") : " "}</p></div>)}
                </div>
                <div className="flex overflow-x-auto">
                    {dates.map(d => <Column date={d} Cell={Cell} />)}
                </div>
            </div>
        </div>
    )
}


interface ColumnProps {
    date: DateInfo,
    Cell: ComponentType<datetime>
}

function Column({date, Cell}: ColumnProps) {

    return (
        <div className="min-w-20" style={{marginRight: date.connected ? 0 : 20}}>
            <p className="text-center">{date.date.format("M/D/YY")}</p>
            {date.top_datetimes.map(t => {
                if (t) {
                    return (
                        <div className="border h-8">
                            <Cell datetime={t} />
                        </div>
                    )
                } else {
                    return <div className={`border h-8 bg-slate-600`} />
                }
            })}
            <div style={{marginBottom: 20}} />
            {date.bottom_datetimes.map(t => {
                if (t) {
                    return (
                        <div className="border h-8">
                            <Cell datetime={t} />
                        </div>
                    )
                } else {
                    return <div className={`border h-8 bg-slate-600`} />
                }
            })}
        </div>
    )
}