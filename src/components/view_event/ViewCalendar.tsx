import { Drawer } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { useEvent } from "./EventContext";
import TimeColumn from "./TimeColumn";
import Calendar from "./Calendar";
import AvailabilityDetails from "./AvailabilityDetails";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

interface props {
    setSelected?: any,
    start: number,
    setStart: Dispatch<SetStateAction<number>>,
}



export default function ViewCalendar({start, setSelected, setStart} : props) {

    const [mouseDown, setMouseDown] = useState(false)
    const [clicked, setClicked] = useState<any>({date: null, total: null, num: null, users: []})
    const width = useScreenWidth()

    const select = (val: any, val2: any) => {
        if (width > 786) {
            setSelected(val)
        } else {
            setClicked(val)
        }
    }

    const handleMouseLeave = () => {
        if (setSelected) {
            setSelected(null);
        }
    }


    return (
        <div onMouseLeave={handleMouseLeave}>
            <Calendar
                title="View Group's Availability"
                subtitle={`${width < 768 ? "Click" : "Hover"} to see who's available at a given time.`}
                start={start}
                Cell={ViewCell(select)}
                setStart={setStart}
            />

                <Drawer open={clicked.date != null} anchor="bottom" onClose={() => setClicked({date: null, total: null, num: null, users: []})}>
                    <div className="p-4 pb-8">
                        {clicked.date &&
                            <AvailabilityDetails date={clicked.date} users={clicked.users} total={clicked.total} num={clicked.num} />
                        }
                    </div>
                </Drawer>
        </div>

    )
}


function ViewCell(setSelected: any) {

    const {event, calendar} = useEvent()

    return ({row, col}: any) => {

        const users = event.availability_by_time.get(calendar.get_datetime(row, col))
        const date = calendar.get_dayjs(row, col)
        const num = users?.size
        const total = event.availability_by_user.size
    
        const data = {users, date, num, total}

        const size = event.availability_by_time.get(calendar.get_datetime(row, col))?.size
        const weight = size ? Math.round(size / event.availability_by_user.size * 1000) / 1000 : 0


        const handleClick = () => {
            setSelected((x: any) => {
                if (x && x.date && x.date.isSame(data.date)) {
                    return x
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

        if (!event.availability_by_time.has(calendar.get_datetime(row, col))) {
            return <div className="h-full border-2 bg-gray-400" />
        }

        return (
            <div className="h-full border-2 touch-none" onPointerMove={handleClick} onClick={handleClick}>
                <div className="h-full bg-red-500" style={{opacity: weight}} />
            </div>
        )

    }
}