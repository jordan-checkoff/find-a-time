import { Dayjs } from "dayjs";
import Event, { Calendar as C } from "../../interfaces/Event";
import Calendar from "./Calendar";
import { Drawer } from "@mui/material";
import { useState } from "react";

interface props {
    data: Event,
    calendar: C,
    onHover?: any
}

interface cellProps {
    rowNum: number,
    colNum: number
}



export default function ViewCalendar({data, calendar, onHover} : props) {


    function AvailabilityCell({rowNum, colNum} : cellProps) {
        const datetime = calendar.get_datetime(rowNum, colNum)
        const users = data.availability_by_time.get(datetime)
        const [open, setOpen] = useState(false)

        let pct = users && users.size > 0 ? users.size / data.availability_by_user.size : 0
        pct = Math.round(pct * 100) / 100

        if (!data.availability_by_time.has(datetime)) {
            return <div className="h-full bg-gray-400" />
        }

        const handleClick = () => {
            if (window.innerWidth < 1000 && users && users.size > 0) {
                if (window.innerWidth < 1000) {
                    setOpen(true)
                } else {
                    onHover({datetime: calendar.get_dayjs(rowNum, colNum).format("M/D/YY h:mm A"), people: Array.from(users)})
                }
            }   
        }

        const handleHover = () => {
            if (window.innerWidth >= 1000) {
                if (users && users.size > 0) {
                    onHover({datetime: calendar.get_dayjs(rowNum, colNum).format("M/D/YY h:mm A"), people: Array.from(users), percentage: `${users.size}/${data.availability_by_user.size}`})
                } else {
                    onHover({datetime: calendar.get_dayjs(rowNum, colNum).format("M/D/YY h:mm A"), people: null, percentage: `0/${data.availability_by_user.size}`})
                }
            }
        }
        
        return (
            <>
                <div onClick={handleClick} onMouseEnter={handleHover} className={`h-full bg-red-500`} style={{opacity: pct}}>
                </div>
                {users && users.size > 0 &&
                                <Drawer
                                    open={open}
                                    onClose={() => setOpen(false)}
                                    anchor={"bottom"}
                                    sx={{
                                        '& .MuiDrawer-paper': {
                                          maxHeight: '75%',
                                        },
                                      }}
                                    
                                >
                                    <div className="p-10">
                                        <p className="font-bold mb-2">{calendar.get_dayjs(rowNum, colNum).format("M/D/YY h:mm A")}</p>
                                        <p>{`${users.size}/${data.availability_by_user.size} users available`}</p>
                                        {Array.from(users).map(x => <p>{x}</p>)}
                                    </div>
                                </Drawer> 
                                        
                                
            }
            </>
        )

        return <p>A</p>
    }

    return (
        <div onMouseLeave={() => onHover(null)}>
            <Calendar Cell={AvailabilityCell} data={data} calendar={calendar} />
        </div>
    )
}