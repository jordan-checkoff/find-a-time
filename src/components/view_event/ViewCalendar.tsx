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

    const getData = (row: number, col: number) => {
        const users = event.availability_by_time.get(calendar.get_datetime(row, col))
        const date = calendar.get_dayjs(row, col).format("M/D/YY h:mm A")
        const num = users?.size
        const total = event.availability_by_user.size

        return {users, date, num, total}
    }

    const weight = (rowNum: number, colNum: number) => {
        const size = event.availability_by_time.get(calendar.get_datetime(rowNum, colNum))?.size
        if (size) {
            return Math.round(size / event.availability_by_user.size * 1000) / 1000

        } else {
            return 0
        }
    }

    const onMouseEnter = (row: number, col: number) => {
        if (window.innerWidth > 786) {
            return () => setSelected(getData(row, col))
        } else {
            return () => {}
        }
    }

    const onMouseLeave = (row: number, col: number) => {
        if (window.innerWidth > 786) {
            return () => setSelected(null)
        } else {
            return () => {}
        }
    }

    const onClick = (row: number, col: number) => {
        if (window.innerWidth < 786) {
            return () => setClicked(getData(row, col))
        } else {
            return () => {}
        }
    }

    return (
        <>
            <Calendar
                title="View Group's Availability"
                subtitle={`${window.innerWidth > 1000 ? "Hover" : "Click"} to see who's available at a given time.`}
                start={start}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                weight={weight}
                onClick={onClick}
            />

            <Drawer open={clicked.date != null} anchor="bottom" onClose={() => setClicked({date: null, total: null, num: null, users: []})}>
                 <p>{clicked.date}</p>
                 <p>{clicked.num}/{clicked.total}</p>
                 {Array.from(clicked.users).map((u) => {
                    return <p>{u as string}</p>
                })}
            </Drawer>
        </>

    )

}