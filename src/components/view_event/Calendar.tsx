
import { ComponentType, useEffect, useRef, useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Event, { Calendar as C } from "../../interfaces/Event";
import Button from "../common/Button";


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

    const numCols = Math.floor((window.innerWidth - 100) / 64)

    console.log(calendar.get_breaks())


    return (
        <div className="pb-10 w-full" style={{userSelect: "none"}}>
            {calendar.dates.length > numCols 
            &&
                <div className="grid grid-cols-2 gap-2 mb-4">
                    <Button onClick={decrement} text="<" disabled={start == 0} />
                    <Button onClick={increment} text=">" disabled={start + numCols >= calendar.dates.length} />
                </div>
            }
            <div style={{display: "grid", gridTemplateRows: `30px repeat(${calendar.bottom_blocks.length+calendar.top_blocks.length}, 30px)`, gridTemplateColumns: `80px repeat(${Math.min(numCols, calendar.dates.length)}, 4rem)`}} className="overflow-x-scroll">
                <div />
                {calendar.get_dates().slice(start, start+numCols).map(d => <p className="text-center text-sm">{d}</p>)}
                {calendar.get_top_blocks().map((t, i) => {
                    const output = [<p className="text-sm text-right pr-4">{t}</p>]
                    calendar.dates.slice(start, start+numCols).forEach((d, j) => {
                        output.push(<div className="border-2"><Cell colNum={j + start} rowNum={i} /></div>)
                    })
                    return output
                })}
                {calendar.get_bottom_blocks().map((t, i) => {
                    const output = [<p className="text-sm text-right pr-4">{t}</p>]
                    calendar.dates.slice(start, start+numCols).forEach((d, j) => {
                        output.push(<div style={{marginRight: calendar.get_breaks().has(j + start) ? 10 : 0}} className="border-2 mr-2"><Cell colNum={j + start} rowNum={i + calendar.top_blocks.length} /></div>)
                    })
                    return output
                })}
            </div>
        </div>
    )
}

