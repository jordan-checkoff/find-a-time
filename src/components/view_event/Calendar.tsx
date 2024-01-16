import { useEvent } from "./EventContext";
import TimeColumn from "./TimeColumn";

interface props {
    title: string,
    subtitle: string,
    start: number,
    onMouseEnter?: (row: number, col: number) => () => void,
    onMouseDown?: (row: number, col: number) => () => void,
    onMouseLeave?: (row: number, col: number) => () => void,
    onMouseMove?: (row: number, col: number) => () => void,
    onClick?: (row: number, col: number) => () => void,
    weight: (row: number, col: number) => number,
}



export default function Calendar({title, subtitle, start, onMouseMove = (r, c) => () => {}, onMouseDown = (r, c) => () => {}, onMouseEnter = (r, c) => () => {}, onClick = (r, c) => () => {}, onMouseLeave = (r, c) => () => {}, weight} : props) {

    const { calendar } = useEvent()
    const numCols = calendar.get_num_cols()
    const gaps = calendar.get_breaks()

    return (
        <div>
            <p className="mb-2 text-xl font-bold">{title}</p>
            <p className="mb-8">{subtitle}</p>
            <div className="pb-10 w-full overflow-x-scroll flex select-none">
                <TimeColumn />
                {calendar.get_dates().slice(start, start+numCols).map((d, i) => <Column onMouseMove={onMouseMove} onMouseDown={onMouseDown} onClick={onClick} weight={weight} colNum={i + start} date={d} gap={gaps.has(i)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} bottomtimes={calendar.get_bottom_blocks()} toptimes={calendar.get_top_blocks()} />)}    
            </div>
        </div>

    )

}

interface ColumnProps {
    gap: boolean,
    onMouseEnter: (row: number, col: number) => () => void,
    onMouseLeave: (row: number, col: number) => () => void,
    onClick: (row: number, col: number) => () => void,
    onMouseDown: (row: number, col: number) => () => void,
    onMouseMove: (row: number, col: number) => () => void,
    date: string,
    toptimes: string[],
    bottomtimes: string[],
    colNum: number,
    weight: (row: number, col: number) => number,
}

function Column({gap, date, onMouseMove, onMouseEnter, onClick, onMouseDown, onMouseLeave, toptimes, bottomtimes, colNum, weight}: ColumnProps) {

    const { event, calendar } = useEvent()

    const exists = (row: number, col: number) => {
        return event.availability_by_time.has(calendar.get_datetime(row, col))
    }

    return (
        <div className="w-20" style={{marginRight: gap ? 10 : 0}}>
            <p className="text-center mb-2 text-xs">{date}</p>
            {toptimes.length > 0 && 
                <div className="mb-4">
                    {toptimes.map((t, i) => <Cell onMouseMove={onMouseMove(i, colNum)} onMouseDown={onMouseDown(i, colNum)} exists={exists(i, colNum)} onClick={onClick(i, colNum)} weight={weight(i, colNum)} onMouseEnter={onMouseEnter(i, colNum)} onMouseLeave={onMouseLeave(i, colNum)} />)}
                </div>
            }

            {bottomtimes.map((t, i) => <Cell onMouseMove={onMouseMove(i + toptimes.length, colNum)} onMouseDown={onMouseDown(i + toptimes.length, colNum)} exists={exists(i + toptimes.length, colNum)} onClick={onClick(i + toptimes.length, colNum)} weight={weight(i + toptimes.length, colNum)} onMouseEnter={onMouseEnter(i+ toptimes.length, colNum)} onMouseLeave={onMouseLeave(i+ toptimes.length, colNum)} />)}
        </div>
    )
}


interface cellProps {
    weight: number,
    onMouseEnter: () => void,
    onMouseMove: () => void,
    onMouseLeave: () => void,
    onMouseDown: () => void,
    onClick: () => void,
    exists: boolean
}

function Cell({onMouseEnter, onMouseMove, onMouseLeave, onMouseDown, weight, onClick, exists}: cellProps) {

    if (!exists) {
        return <div className="h-6 border-2 bg-gray-400" />
    }

    return (
        <div className={`h-6 border-2`} onMouseMove={onMouseMove} onMouseDown={onMouseDown} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
                <div style={{opacity: weight}} className={`h-full bg-red-500`}  />
        </div>
    )
}

