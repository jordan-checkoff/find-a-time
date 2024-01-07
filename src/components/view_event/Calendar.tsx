
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

    const [start, setStart] = useState(0)

    const increment = () => {
        setStart(start+1)
    }

    const decrement = () => {
        setStart(start-1)
    }


    return (
        <div className="flex pb-10 w-full">
            <div style={{display: "grid", gridTemplateRows: `30px repeat(${calendar.bottom_blocks.length+calendar.top_blocks.length}, 30px)`, gridTemplateColumns: `100px repeat(${Math.min(3, calendar.dates.length)}, 4rem) 50px`}} className="overflow-x-scroll">
                {start > 0 ? <button onClick={decrement}>&lt;</button> : <div />}
                {calendar.get_dates().slice(start, start+3).map(d => <p className="self-start bg-white h-full z-25">{d}</p>)}
                {start + 3 < calendar.dates.length ? <button onClick={increment}>&gt;</button> : <div />}
                {calendar.get_top_blocks().map((t, i) => {
                    const output = [<p>{t}</p>]
                    calendar.dates.slice(start, start+3).forEach((d, j) => {
                        output.push(<Cell colNum={j} rowNum={i} />)
                    })
                    output.push(<p></p>)
                    return output
                })}
                {calendar.get_bottom_blocks().map((t, i) => {
                    const output = [<p className="bg-white">{t}</p>]
                    calendar.dates.slice(start, start+3).forEach((d, j) => {
                        output.push(<div className="border-2"><Cell colNum={j + start} rowNum={i + calendar.top_blocks.length} /></div>)
                    })
                    output.push(<p></p>)
                    return output

                })}
            </div>
            {/* <div className="flex overflow-x-auto">
                <div className="min-w-16 mr-4 sticky">
                    <div className="h-8" />
                    {calendar.get_top_blocks().map(t => <div className="h-8"><p className="text-xs">{t}</p></div>)}
                    <div style={{marginBottom: 10}} />
                    {calendar.get_bottom_blocks().map(t => <div className="h-8"><p className="text-sm text-right relative bottom-5">{t}</p></div>)}
                </div>
                {calendar.get_dates().map((d, i) => <Column Cell={Cell} date={d} top_blocks={calendar.get_top_blocks()} bottom_blocks={calendar.get_bottom_blocks()} colNum={i} />)}
            </div> */}
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
                    <div className="border h-8 pinch-zoom">
                        <Cell colNum={colNum} rowNum={i} />
                    </div>
                )
            })}
            <div style={{marginBottom: 10}} />
            {bottom_blocks.map((t, i) => {
                return (
                    <div className="border h-8 s-pinch-zoom">
                        <Cell colNum={colNum} rowNum={i} />
                    </div>
                )
            })}
        </div>
    )
}