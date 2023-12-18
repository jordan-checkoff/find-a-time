
import { useState } from "react"
import { Event } from "../interfaces"
import { SetStateAction, Dispatch } from "react"

interface props {
    data: Event
}

export default function Calendar({data}: props) {

    return (
        <div>
            <div style={{display: "grid", gridTemplateColumns: `repeat(${data.date_range.length + 1}, 200px)`}}>
                {["Time", ...data.date_range].map(d => <p>{d}</p>)}
            </div>
            {data.time_range.map(t => <Row time={t} dates={data.date_range} availability={data.availability_by_time} l={data.date_range.length} />)}
        </div>
    )
}

interface columnProps {
    time: string,
    dates: Array<string>,
    availability: Map<string, Array<string>>,
    l: number,
}

function Row({time, dates, availability, l} : columnProps) {
    return (
        <div style={{display: "grid", gridTemplateColumns: `repeat(${l + 1}, 200px)`}}>
            <p>{time}</p>
            {dates.map(x => <Cell date={x} time={time} availability={availability.get(x + " " + time)} />)}
        </div>
    )
}

interface cellProps {
    date: string,
    time: string,
    availability: Array<string> | undefined,
}

function Cell({date, time, availability}: cellProps) {

    return (
        <div style={{border:"1px solid black"}}>
            {availability && availability.map(x => <p>{x}</p>)}
        </div>
    )
}