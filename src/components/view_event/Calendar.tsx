
import { ComponentType } from "react"
import dayjs, { Dayjs } from "dayjs"
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Event from "../../interfaces/Event";


dayjs.extend(utc)
dayjs.extend(timezone)

interface props {
    data: Event,
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

export default function Calendar({Cell, data, timezone}: props) {

    const {dates, top_datetimes, bottom_datetimes} = data.get_calendar(timezone)


    return (
        <div>
            <div className="flex">
                <div className="min-w-16 mr-4">
                    <div className="h-8" />
                    {top_datetimes.map(t => <div className="h-8"><p className="text-xs">{t ? t.format("h:mm A") : " "}</p></div>)}
                    <div style={{marginBottom: 10}} />
                    {bottom_datetimes.map(t => <div className="h-8"><p className="text-sm text-right relative bottom-5">{t ? t.format("h:mm A") : " "}</p></div>)}
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
            <p className="text-center text-sm">{date.date.format("M/D/YY")}</p>
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
            <div style={{marginBottom: 10}} />
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