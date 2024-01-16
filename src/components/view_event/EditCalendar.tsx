import { useState } from "react"
import Event, { Calendar as C } from "../../interfaces/Event"
import { useEvent } from "./EventContext"
import Calendar from "./Calendar"

interface props {
    data: Event,
    calendar:  C,
    startCol: number,
    endCol: number,
    user: string,

}

export default function EditCalendar({data, calendar, startCol, endCol, user}: props) {

    const [mouseDown, setMouseDown] = useState(false)
    const [adding, setAdding] = useState(false)
    const [start, setStart] = useState([-1, -1])
    const [end, setEnd] = useState([-1, -1])

    
    const { updateAvailability } = useEvent()

    const isChecked = (row: number, col: number) => {
        if (row >= Math.min(start[0], end[0]) && row <= Math.max(start[0],end[0]) && col >= Math.min(start[1], end[1]) && col <= Math.max(start[1],end[1])) {
            return adding
        }
        return !!data.availability_by_user.get(user)?.has(calendar.get_datetime(row, col))
    }

    const weight = (row: number, col: number) => {
        if (isChecked(row, col)) {
            return 1
        } else {
            return 0
        }
    }

    const handleMouseDown = (row: number, col: number) => {
        return () => {
            setMouseDown(true)
            setAdding(!data.availability_by_user.get(user)?.has(calendar.get_datetime(row, col)))
            setStart([row, col])
            setEnd([row, col])
        }
    }

    const handleMouseMove = (row: number, col: number) => {
        if (mouseDown) {
            return () => setEnd([row, col])
        } else {
            return () => {}
        }
    }

    const handleMouseUp = () => {
        if (mouseDown) {
            setMouseDown(false)
            updateAvailability(calendar.get_datetimes(start[0], end[0], start[1], end[1]), adding, user)   
        }
    }

    document.onpointerup = handleMouseUp


    return (
        <Calendar
            title="Edit Your Availability"
            subtitle="Drag to select the times when you are available."
            start={startCol}
            weight={weight}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
        />
    )
}