import { useEvent } from "./EventContext";
import TimeColumn from "./TimeColumn";

interface props {
    title: string,
    subtitle: string,
    start: number,
    Cell: any
}



export default function Calendar({title, subtitle, start, Cell} : props) {

    const { calendar } = useEvent()
    const numCols = calendar.get_num_cols()
    const gaps = calendar.get_breaks()

    return (
        <div>
            <p className="mb-2 text-xl font-bold">{title}</p>
            <p className="mb-8">{subtitle}</p>
            <div className="pb-10 w-full overflow-x-scroll flex select-none">
                <TimeColumn />
                {calendar.get_dates().slice(start, start+numCols).map((d, i) => <Column colNum={i + start} date={d} gap={gaps.has(i + start)} bottomtimes={calendar.get_bottom_blocks()} toptimes={calendar.get_top_blocks()} Cell={Cell} />)}    
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
    colNum: number
}

function Column({gap, date, toptimes, bottomtimes, colNum, Cell}: ColumnProps) {

    const { event, calendar } = useEvent()

    const exists = (row: number, col: number) => {
        return event.availability_by_time.has(calendar.get_datetime(row, col))
    }

    return (
        <div className="w-20" style={{marginRight: gap ? 10 : 0}}>
            <p className="text-center mb-2 text-xs">{date}</p>
            {toptimes.length > 0 && 
                <div className="mb-4">
                    {toptimes.map((t, i) => <div className="h-6 cursor-pointer"><Cell row={i} col={colNum} /></div>)}
                </div>
            }

            {bottomtimes.map((t, i) => <div className="h-6 cursor-pointer"><Cell row={i + toptimes.length} col={colNum} /></div>)}
        </div>
    )
}
