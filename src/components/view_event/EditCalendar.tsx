import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Event from "../../interfaces/Event";
import Calendar from "./Calendar";
import { updateAvailability } from "../../utils/api_calls";
import { Dayjs } from "dayjs";
import { Checkbox } from "@mui/material";

interface props {
    data: Event,
    user: string,
    setData: (x: number, y: boolean) => void,
    timezone: string,
    setUser: (x: null) => void
}

interface cellProps {
    datetime: Dayjs

}



export default function EditCalendar({data, user, setData, timezone, setUser} : props) {

    const [isSelecting, setIsSelecting] = useState(0);

    const handleMouseDown = (x: number, y: boolean) => {
        if (y) {
            setIsSelecting(1);
        } else {
            setIsSelecting(2)
        }
        setData(x, y)
    };

    const handleMouseEnter = (x: number, y: boolean) => {
        if ((isSelecting == 1 && y) || (isSelecting == 2 && !y)) {
            setData(x, y)
        }
      };

    const handleMouseUp = () => {
        console.log('a')
        setIsSelecting(0);
        data.send_update(user)
    };


    function EditCell({datetime} : cellProps) {

        const cellRef = useRef<HTMLDivElement>(null)

        const ms = datetime.valueOf()

        const checked = data.availability_by_time.get(ms)?.has(user)

        return <div
                    className={`flex justify-center h-full`}
                    style={checked ? {backgroundColor: "red"} : {}}
                    onMouseDown={() => handleMouseDown(ms, !checked)}
                    onMouseMove={() => handleMouseEnter(ms, !checked)}
                    onMouseUp={handleMouseUp}  
                    ref={cellRef}
                />

    }

    return (
        <Calendar timezone={timezone} data={data} Cell={(x) => EditCell(x)} />
    )
}