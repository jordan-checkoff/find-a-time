import { useState } from "react"
import Event, { Calendar } from "../../interfaces/Event"

interface props {
    data: Event,
    calendar:  Calendar,
    startCol: number,
    endCol: number,
    user: string,
    updateAvailability: (user: string, datetimes: number[], adding: boolean) => void

}

export default function EditCalendar({data, calendar, startCol, endCol, user, updateAvailability}: props) {

    const [mouseDown, setMouseDown] = useState(false)
    const [adding, setAdding] = useState(false)
    const [start, setStart] = useState([-1, -1])
    const [end, setEnd] = useState([-1, -1])

    const exists = (row: number, col: number) => {
        return data.availability_by_time.has(calendar.get_datetime(row, col))
    }


    const isChecked = (row: number, col: number) => {
        if (row >= Math.min(start[0], end[0]) && row <= Math.max(start[0],end[0]) && col >= Math.min(start[1], end[1]) && col <= Math.max(start[1],end[1])) {
            return adding
        }
        return !!data.availability_by_user.get(user)?.has(calendar.get_datetime(row, col))
    }

    const handleMouseDown = (row: number, col: number) => {
        setMouseDown(true)
        setAdding(!data.availability_by_user.get(user)?.has(calendar.get_datetime(row, col)))
        setStart([row, col])
        setEnd([row, col])
    }

    const handleMouseMove = (row: number, col: number) => {
        if (mouseDown) {
            setEnd([row, col])
        }
    }

    const handleMouseUp = () => {
        if (mouseDown) {
            setMouseDown(false)
            updateAvailability(user, calendar.get_datetimes(start[0], end[0], start[1], end[1]), adding)   
        }
    }

    document.onpointerup = handleMouseUp

    const gaps = calendar.get_breaks()

    return (
        <>
            <p className="mb-2 text-xl font-bold">Edit Your Availability</p>
            <p className="mb-8">Drag to select the times when you are available.</p>
            <div style={{display: "grid", gridTemplateColumns: `80px repeat(${Math.min(endCol-startCol, calendar.dates.length)}, 4rem)`}} className="overflow-x-scroll">
                <TimeCol toptimes={calendar.get_top_blocks()} bottomtimes={calendar.get_bottom_blocks()} />
                {calendar.get_dates().slice(startCol, endCol).map((d, i) => <Column gap={gaps.has(i)} exists={exists} handleMouseMove={handleMouseMove} handleMouseDown={handleMouseDown} checked={isChecked} date={d} toptimes={calendar.get_top_blocks()} bottomtimes={calendar.get_bottom_blocks()} colNum={i + startCol} />)}    
            </div>
        </>

    )
}




interface ColumnProps {
    colNum: number,
    toptimes: string[],
    bottomtimes: string[],
    date: string,
    checked: (row: number, col: number) => boolean,
    handleMouseDown: (row: number, col: number) => void,
    handleMouseMove: (row: number, col: number) => void,
    exists: any,
    gap: boolean
}


function Column({colNum, gap, date, exists, toptimes, bottomtimes, checked, handleMouseDown, handleMouseMove}: ColumnProps) {

    return (
        <div style={{marginRight: gap ? 10 : 0}}>
            <p>{date}</p>
            {toptimes.length > 0 && 
                <div className="mb-4">
                    {toptimes.map((t, i) => <Cell exists={exists(i, colNum)} handleMouseMove={() => handleMouseMove(i, colNum)} handleMouseDown={() => handleMouseDown(i, colNum)} checked={checked(i, colNum)} />)}
                </div>
            }
            {bottomtimes.map((t, i) => <Cell exists={exists(i + toptimes.length, colNum)} handleMouseMove={() => handleMouseMove(i + toptimes.length, colNum)} handleMouseDown={() => handleMouseDown(i + toptimes.length, colNum)} checked={checked(i + toptimes.length, colNum)} />)}
        </div>
    )
}

interface cellProps {
    checked: boolean
    handleMouseDown: () => void
    handleMouseMove: () => void
    exists: boolean
}

function Cell({exists, checked, handleMouseDown, handleMouseMove}: cellProps) {

    if (!exists) {
        return <div className="h-6 border-2 bg-gray-400" />
    }

    return (
        <div className="h-6 border-2" onPointerDown={handleMouseDown} onPointerMove={handleMouseMove} style={{backgroundColor: checked ? "red" : "white"}} />
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