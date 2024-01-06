
import { ComponentType, useEffect, useRef, useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Event, { Calendar as C } from "../../interfaces/Event";


dayjs.extend(utc)
dayjs.extend(timezone)

interface props {
    data: Event,
    Cell: ComponentType<datetime>,
    calendar: C
}

interface datetime {
    colNum: number,
    rowNum: number
}

export default function Calendar({Cell, data, calendar}: props) {


    return (
        <div className="flex pb-10">
            <div className="min-w-16 mr-4">
                <div className="h-8" />
                {calendar.get_top_blocks().map(t => <div className="h-8"><p className="text-xs">{t}</p></div>)}
                <div style={{marginBottom: 10}} />
                {calendar.get_bottom_blocks().map(t => <div className="h-8"><p className="text-sm text-right relative bottom-5">{t}</p></div>)}
            </div>
            <div className="flex overflow-x-auto">
                {calendar.get_dates().map((d, i) => <Column Cell={Cell} date={d} top_blocks={calendar.get_top_blocks()} bottom_blocks={calendar.get_bottom_blocks()} colNum={i} />)}
            </div>
        </div>
    )
}


interface ColumnProps {
    Cell: ComponentType<datetime>,
    top_blocks: string[],
    bottom_blocks: string[],
    colNum: number,
    date: string
}

function Column({bottom_blocks, Cell, colNum, top_blocks, date}: ColumnProps) {

    return (
        <div className="min-w-20">
            <p className="text-center text-sm">{date}</p>
            {top_blocks.map((t, i) => {
                return (
                    <div className="border h-8">
                        <Cell colNum={colNum} rowNum={i} />
                    </div>
                )
            })}
            <div style={{marginBottom: 10}} />
            {bottom_blocks.map((t, i) => {
                return (
                    <div className="border h-8">
                        <Cell colNum={colNum} rowNum={i} />
                    </div>
                )
            })}
        </div>
    )
}