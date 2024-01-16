import { Dayjs } from "dayjs";
import Event, { Calendar as C } from "../../interfaces/Event";
import { Drawer } from "@mui/material";
import { useState } from "react";
import Button from "../common/Button";

interface props {
    data: Event,
    calendar: C,
    setSelected?: any,
    start: number,
    numCols: number,
}



export default function ViewCalendar({data, calendar, start, numCols, setSelected} : props) {

    const weight = (rowNum: number, colNum: number) => {
        const size = data.availability_by_time.get(calendar.get_datetime(rowNum, colNum))?.size
        if (size) {
            return Math.round(size / data.availability_by_user.size * 1000) / 1000

        } else {
            return 0
        }
    }

    const getData = (rowNum: number, colNum: number) => {
        const users = data.availability_by_time.get(calendar.get_datetime(rowNum, colNum))
        const date = calendar.get_dayjs(rowNum, colNum).format("M/D/YY h:mm A")
        const num = users?.size
        const total = data.availability_by_user.size
        return {users, date, num, total}
    }

    const gaps = calendar.get_breaks()

    return (
        <div>
            <p className="mb-2 text-xl font-bold">View Group's Availability</p>
            <p className="mb-8">{window.innerWidth > 1000 ? "Hover" : "Click"} to see who's available at a given time.</p>
            <div className="pb-10 w-full" style={{userSelect: "none"}}>
                <div style={{display: "grid", gridTemplateColumns: `80px repeat(${Math.min(numCols, calendar.dates.length)}, 4rem)`}} className="overflow-x-scroll">
                    <TimeCol toptimes={calendar.get_top_blocks()} bottomtimes={calendar.get_bottom_blocks()} />
                    {calendar.get_dates().slice(start, start+numCols).map((d, i) => <Column gap={gaps.has(i)} setSelected={setSelected} date={d} getData={getData} weight={weight} toptimes={calendar.get_top_blocks()} bottomtimes={calendar.get_bottom_blocks()} colNum={i + start} />)}    
                </div>
            </div>
        </div>

    )

}


interface ColumnProps {
    colNum: number,
    toptimes: string[],
    bottomtimes: string[],
    date: string,
    getData: any,
    weight: (row: number, col: number) => number,
    setSelected: any,
    gap: boolean
}


function Column({colNum, gap, date, toptimes, bottomtimes, weight, getData, setSelected}: ColumnProps) {

    return (
        <div style={{marginRight: gap ? 10 : 0}}>
            <p>{date}</p>
            {toptimes.length > 0 && 
                <div className="mb-4">
                    {toptimes.map((t, i) => <Cell setSelected={setSelected} weight={weight(i, colNum)} data={getData(i, colNum)} />)}
                </div>
            }

            {bottomtimes.map((t, i) => <Cell setSelected={setSelected} weight={weight(i+ toptimes.length, colNum)} data={getData(i + toptimes.length, colNum)} />)}
        </div>
    )
}



interface cellProps {
    weight: number,
    data: any,
    setSelected: any
}

function Cell({weight, data, setSelected}: cellProps) {
    const [open, setOpen] = useState(false)

    if (window.innerWidth > 1000) {
        return (
            <div className={`h-6 border-2`} onMouseEnter={() => setSelected(data)} onMouseLeave={() => setSelected(null)}>
                <div style={{opacity: weight}} className={`h-full bg-red-500`}  />
            </div>
        )
    }

    return (
        <>
            <Drawer open={open} anchor="bottom" onClose={() => setOpen(false)}>
                <p>{data.date}</p>
                <p>{data.num}/{data.total}</p>
                {Array.from(data.users).map((u) => {
                    return <p>{u as string}</p>
                })}
            </Drawer>
            <div className={`h-6 border-2`} onClick={() => setOpen(true)}>
                <div style={{opacity: weight}} className={`h-full bg-red-500`}  />
            </div>
        </>
    ) 


}



interface TimeColProps {
    toptimes: string[],
    bottomtimes: string[],
}

function TimeCol({toptimes, bottomtimes}: TimeColProps) {

    return (
        <div>
            <div className="mb-4" />
            {toptimes.length > 0 && 
                <div className="mb-4">
                    {bottomtimes.map(x => x && <p className="mb-6">{x}</p>)}
                </div>
            }
            <div>
                {bottomtimes.map(x => x && <p className="mb-6">{x}</p>)}
            </div>
        </div>
    )
}