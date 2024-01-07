import { Dayjs } from "dayjs";
import Event, { Calendar as C } from "../../interfaces/Event";
import Calendar from "./Calendar";
import { Drawer } from "@mui/material";
import { useState } from "react";

interface props {
    data: Event,
    calendar: C
}

interface cellProps {
    rowNum: number,
    colNum: number
}



export default function ViewCalendar({data, calendar} : props) {


    function AvailabilityCell({rowNum, colNum} : cellProps) {
        const datetime = calendar.get_datetime(rowNum, colNum)
        const users = data.availability_by_time.get(datetime)
        const [open, setOpen] = useState(false)

        let pct = users && users.size > 0 ? users.size / data.availability_by_user.size : 0
        pct = Math.round(pct * 100) / 100

        if (!data.availability_by_time.has(datetime)) {
            return <div className="h-full bg-slate-500" />
        }
        
        return (
            <>
                <div onClick={() => setOpen(true)} className={`h-full bg-red-500`} style={{opacity: pct}}>
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
                                        {Array.from(users).map(x => <p>{x}</p>)}
                                    </div>
                                </Drawer> 
                                        
                                
            }
            </>
        )

        return <p>A</p>
    }

    return (
        <div>
            <Calendar Cell={AvailabilityCell} data={data} calendar={calendar} />
        </div>
    )
}