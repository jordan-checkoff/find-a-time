import { Dispatch, SetStateAction } from "react";
import { useEvent } from "./EventContext";
import NavButtons from "./NavButtons";
import TimeColumn from "./TimeColumn";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

interface props {
    title: string,
    subtitle: string,
    start: number,
    Cell: any,
    setStart: Dispatch<SetStateAction<number>>
}



export default function Calendar({title, subtitle, start, Cell, setStart} : props) {

    const { calendar } = useEvent()
    const numCols = calendar.get_num_cols()
    const gaps = calendar.get_breaks()
    const width = useScreenWidth()

    return (
        <div>
            <p className="mb-2 text-xl font-bold">{title}</p>
            <p className="mb-6">{subtitle}</p>

            {width < 768 && <NavButtons start={start} setStart={setStart} />} 
            <div className="pb-10 w-full overflow-x-scroll flex select-none">
                <TimeColumn />
                {calendar.get_dates().slice(start, start+numCols).map((d, i) => <Column colNum={i + start} date={d.date} day={d.day} gap={gaps.has(i + start)} bottomtimes={calendar.get_bottom_blocks()} toptimes={calendar.get_top_blocks()} Cell={Cell} />)}    
            </div>
        </div>

    )

}

interface ColumnProps {
    gap: boolean,
    Cell: any,
    date: string,
    toptimes: string[],
    bottomtimes: string[],
    colNum: number,
    day: string
}

function Column({gap, date, toptimes, day, bottomtimes, colNum, Cell}: ColumnProps) {


    return (
        <div className="w-16" style={{marginRight: gap ? 10 : 0}}>
            <p className="text-center text-xs">{date}</p>
            <p className="text-center">{day}</p>
            {toptimes.length > 0 && 
                <div className="mb-4 w-20">
                    {toptimes.map((t, i) => <div className="h-6 w-16 cursor-pointer"><Cell row={i} col={colNum} /></div>)}
                </div>
            }

            {bottomtimes.map((t, i) => <div className="h-6 w-16 cursor-pointer"><Cell row={i + toptimes.length} col={colNum} /></div>)}
        </div>
    )
}
