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

export default function EditCalendar({data, calendar, startCol, setStart, user}: props) {

    const [clicked, setClicked] = useState([-1, -1])

    
    const { updateAvailability } = useEvent()

    const handleClick = (row: number, col: number) => {
        if (clicked[0] == -1) {
            setClicked([row, col])
        } else {
            updateAvailability(calendar.get_datetimes(row, clicked[0], col, clicked[1]), !data.availability_by_user.get(user)?.has(calendar.get_datetime(clicked[0], clicked[1])), user)
            setClicked([-1, -1])
        }
    }


    return (
        <Calendar
            title="Edit Your Availability"
            subtitle="Select two times to add/remove all times within that time range."
            start={startCol}
            Cell={EditCell(user, clicked, handleClick)}
            setStart={setStart}
        />
    )
}


function EditCell(user: string, clicked: any, handleClick: any) {

    const {event, calendar} = useEvent()

    return ({row, col}: any) => {

        const red = !!event.availability_by_user.get(user)?.has(calendar.get_datetime(row, col))

        if (!event.availability_by_time.has(calendar.get_datetime(row, col))) {
            return <div className="h-full border-2 bg-gray-400" />
        }

        return (
            <div className="h-full border-2" style={{backgroundColor: red ? "red" : undefined, borderColor: clicked[0] == row && clicked[1] == col ? "yellow" : "#EEE"}} onClick={() => handleClick(row, col)} />
        )

    }
}