import { Dayjs } from "dayjs";
import { Event } from "../../interfaces/interfaces";
import Calendar from "./Calendar";
import { Drawer, Popover } from "@mui/material";
import { useRef, useState } from "react";
import TimezoneInput from "../common/TimezoneInput";
import dayjs from "dayjs";

interface props {
    data: Event,
    timezone: string
}

interface datetime {
    datetime: Dayjs
}



export default function ViewCalendar({data, timezone} : props) {


    function AvailabilityCell({datetime} : datetime) {
        const users = data.availability_by_time.get(datetime.valueOf())
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
    }

    return (
        <div>
            <Calendar start_times={data.start_times} num_blocks={data.num_blocks} Cell={AvailabilityCell} timezone={timezone} />
        </div>
    )
}