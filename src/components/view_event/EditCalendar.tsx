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

    return (
       <div style={{display: "grid", gridTemplateColumns: `80px repeat(${Math.min(endCol-startCol, calendar.dates.length)}, 4rem)`}} className="overflow-x-scroll">
            <TimeCol toptimes={calendar.get_top_blocks()} bottomtimes={calendar.get_bottom_blocks()} />
            {calendar.get_dates().slice(startCol, endCol).map((d, i) => <Column handleMouseMove={handleMouseMove} handleMouseDown={handleMouseDown} checked={isChecked} date={d} toptimes={calendar.get_top_blocks()} bottomtimes={calendar.get_bottom_blocks()} colNum={i + startCol} />)}    
        </div>
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
}


function Column({colNum, date, toptimes, bottomtimes, checked, handleMouseDown, handleMouseMove}: ColumnProps) {

    return (
        <div>
            <p>{date}</p>
            {toptimes.map((t, i) => <Cell handleMouseMove={() => handleMouseMove(i, colNum)} handleMouseDown={() => handleMouseDown(i, colNum)} checked={checked(i, colNum)} />)}

            {bottomtimes.map((t, i) => <Cell handleMouseMove={() => handleMouseMove(i, colNum)} handleMouseDown={() => handleMouseDown(i, colNum)} checked={checked(i, colNum)} />)}
        </div>
    )
}

interface cellProps {
    checked: boolean
    handleMouseDown: () => void
    handleMouseMove: () => void
}

function Cell({checked, handleMouseDown, handleMouseMove}: cellProps) {

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
            <div>
                {toptimes.map(x => <p>{x}</p>)}
            </div>
            <div>
                {bottomtimes.map(x => <p>{x}</p>)}
            </div>
        </div>
    )
}