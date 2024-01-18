import { Drawer } from "@mui/material";
import { useState } from "react";
import { useEvent } from "./EventContext";
import TimeColumn from "./TimeColumn";
import Calendar from "./Calendar";

interface props {
    setSelected?: any,
    start: number
}



export default function ViewCalendar({start, setSelected} : props) {

    const {event, calendar} = useEvent()
    const [clicked, setClicked] = useState<any>({date: null, total: null, num: null, users: []})
    const [c, setC] = useState([-1, -1])

    const select = (val: any, val2: any) => {
        if (window.innerWidth > 786) {
            setSelected(val)
            setC(val2)
        } else {
            setClicked(val)
        }
    }

    return (
        <div onMouseLeave={() => {setSelected(null); setC([-1, -1])}}>
            <Calendar
                title="View Group's Availability"
                subtitle={"Click to see who's available at a given time."}
                start={start}
                Cell={ViewCell(select, c)}
            />

            {clicked &&
                <Drawer open={clicked.date != null} anchor="bottom" onClose={() => setClicked({date: null, total: null, num: null, users: []})}>
                    <p>{clicked.date}</p>
                    <p>{clicked.num}/{clicked.total}</p>
                    {Array.from(clicked.users).map((u) => {
                        return <p>{u as string}</p>
                    })}
                </Drawer>
            }
        </div>

    )
}


function ViewCell(setSelected: any, c: any) {

    const {event, calendar} = useEvent()

    return ({row, col}: any) => {

        const handleClick = () => {
            setSelected((x: any) => {
                if (x && x.date == data.date) {
                    return null
                } else {
                    return data
                }
            }, (x: any) => {
                if (x[0] == row && x[1] == col) {
                    return [-1, -1]
                } else {
                    return [row, col]
                }
            })
        }

        const users = event.availability_by_time.get(calendar.get_datetime(row, col))
        const date = calendar.get_dayjs(row, col).format("M/D/YY h:mm A")
        const num = users?.size
        const total = event.availability_by_user.size
    
        const data = {users, date, num, total}

        const size = event.availability_by_time.get(calendar.get_datetime(row, col))?.size
        const weight = size ? Math.round(size / event.availability_by_user.size * 1000) / 1000 : 0

        if (!event.availability_by_time.has(calendar.get_datetime(row, col))) {
            return <div className="h-full border-2 bg-gray-400" />
        }

        return (
            <div className="h-full border-2" style={{borderColor: c[0] == row && c[1] == col ? "yellow" : "#EEE"}} onClick={handleClick}>
                <div className="h-full bg-red-500" style={{opacity: weight}} />
            </div>
        )

    }
}