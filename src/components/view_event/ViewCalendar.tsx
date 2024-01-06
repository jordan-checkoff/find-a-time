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

        let pct = users ? users.size / data.availability_by_user.size : 0
        pct = Math.round(pct * 100) / 100
        
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