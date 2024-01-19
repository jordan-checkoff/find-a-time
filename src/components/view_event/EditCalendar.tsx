import { Dispatch, SetStateAction, useState } from "react"
import Event, { Calendar as C } from "../../interfaces/Event"
import { useEvent } from "./EventContext"
import Calendar from "./Calendar"

interface props {
    data: Event,
    calendar:  C,
    startCol: number,
    endCol: number,
    user: string,
    setStart: Dispatch<SetStateAction<number>>

}

export default function EditCalendar({data, startCol, setStart, user}: props) {

    const [mouseDown, setMouseDown] = useState(false)
    const [begin, setBegin] = useState([-1, -1])
    const [end, setEnd] = useState([-1, -1])

    const {event, calendar} = useEvent()

    const adding = begin[0] != -1 && !event.availability_by_user.get(user)?.has(calendar.get_datetime(begin[0], begin[1]))

    
    const { updateAvailability } = useEvent()

    const handlePointerDown = (row: number, col: number) => {
        setMouseDown(true)
        setBegin([row, col])
        setEnd([row, col])
    }

    const handlePointerUp = () => {
        if (mouseDown) {
            setMouseDown(false)
            updateAvailability(calendar.get_datetimes(begin[0], end[0], begin[1], end[1]), adding, user)
            setBegin([-1, -1])
            setEnd([-1, -1])
        }
    }

    const handlePointerMove = (row: number, col: number) => {
        if (mouseDown && (end[0] != row || end[1] != col)) {
            setEnd([row, col])
        }
    }

    document.onpointerup = handlePointerUp


    return (
        <Calendar
            title="Edit Your Availability"
            subtitle="Drag to select the times that you're available."
            start={startCol}
            Cell={EditCell(user, handlePointerDown, handlePointerMove, begin, end, adding)}
            setStart={setStart}
        />
    )
}


function EditCell(user: string, handlePointerDown: any, handlePointerMove: any, begin: number[], end: number[], adding: boolean) {

    const {event, calendar} = useEvent()

    return ({row, col}: any) => {
        const minY = Math.min(begin[0], end[0])
        const maxY = Math.max(begin[0], end[0])
        const minX = Math.min(begin[1], end[1])
        const maxX = Math.max(begin[1], end[1])

        let red = !!event.availability_by_user.get(user)?.has(calendar.get_datetime(row, col))
        if (row >= minY && row <= maxY && col >= minX && col <= maxX) {
            red = adding
        }

        if (!event.availability_by_time.has(calendar.get_datetime(row, col))) {
            return <div className="h-full border-2 bg-gray-400" />
        }

        return (
            <div className="h-full border-2 touch-none" onPointerMove={() => handlePointerMove(row, col)} onPointerDown={() => handlePointerDown(row, col)} style={{backgroundColor: red ? "red" : undefined}} />
        )

    }
}