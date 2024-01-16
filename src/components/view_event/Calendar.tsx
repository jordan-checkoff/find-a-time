import { Drawer } from "@mui/material";
import { useState } from "react";
import { useEvent } from "./EventContext";
import TimeColumn from "./TimeColumn";

interface props {
    title: string,
    subtitle: string,
    start: number,
    onMouseEnter: (row: number, col: number) => () => void,
    onMouseLeave: (row: number, col: number) => () => void,
    onClick: (row: number, col: number) => () => void,
    weight: (row: number, col: number) => number
}



export default function Calendar({title, subtitle, start, onMouseEnter, onClick, onMouseLeave, weight} : props) {

    const {event, calendar} = useEvent()
    const numCols = calendar.get_num_cols()
    const gaps = calendar.get_breaks()
    // const numCols = calendar.get_num_cols()

    // const weight = (rowNum: number, colNum: number) => {
    //     const size = event.availability_by_time.get(calendar.get_datetime(rowNum, colNum))?.size
    //     if (size) {
    //         return Math.round(size / event.availability_by_user.size * 1000) / 1000

    //     } else {
    //         return 0
    //     }
    // }

    // const getData = (rowNum: number, colNum: number) => {
    //     const users = event.availability_by_time.get(calendar.get_datetime(rowNum, colNum))
    //     const date = calendar.get_dayjs(rowNum, colNum).format("M/D/YY h:mm A")
    //     const num = users?.size
    //     const total = event.availability_by_user.size
    //     return {users, date, num, total}
    // }

    return (
        <div>
            <p className="mb-2 text-xl font-bold">{title}</p>
            <p className="mb-8">{subtitle}</p>
            <div className="pb-10 w-full overflow-x-scroll flex select-none">
                <TimeColumn />
                {calendar.get_dates().slice(start, start+numCols).map((d, i) => <Column onClick={onClick} weight={weight} colNum={i} date={d} gap={gaps.has(i)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} bottomtimes={calendar.get_bottom_blocks()} toptimes={calendar.get_top_blocks()} />)}    
            </div>
        </div>

    )

}

interface ColumnProps {
    gap: boolean,
    onMouseEnter: (row: number, col: number) => () => void,
    onMouseLeave: (row: number, col: number) => () => void,
    onClick: (row: number, col: number) => () => void,
    date: string,
    toptimes: string[],
    bottomtimes: string[],
    colNum: number,
    weight: (row: number, col: number) => number
}

function Column({gap, date, onMouseEnter, onClick, onMouseLeave, toptimes, bottomtimes, colNum, weight}: ColumnProps) {

    return (
        <div className="w-20" style={{marginRight: gap ? 10 : 0}}>
            <p className="text-center mb-2 text-xs">{date}</p>
            {toptimes.length > 0 && 
                <div className="mb-4">
                    {toptimes.map((t, i) => <Cell onClick={onClick(i, colNum)} weight={weight(i, colNum)} onMouseEnter={onMouseEnter(i, colNum)} onMouseLeave={onMouseLeave(i, colNum)} />)}
                </div>
            }

            {bottomtimes.map((t, i) => <Cell onClick={onClick(i, colNum)} weight={weight(i, colNum)} onMouseEnter={onMouseEnter(i, colNum)} onMouseLeave={onMouseLeave(i, colNum)} />)}
        </div>
    )
}


interface cellProps {
    weight: number,
    onMouseEnter: () => void,
    onMouseLeave: () => void
    onClick: () => void
}

function Cell({onMouseEnter, onMouseLeave, weight, onClick}: cellProps) {

    return (
        <div className={`h-6 border-2`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
                <div style={{opacity: weight}} className={`h-full bg-red-500`}  />
        </div>
    )
}


// interface ColumnProps {
//     colNum: number,
//     toptimes: string[],
//     bottomtimes: string[],
//     date: string,
//     getData: any,
//     weight: (row: number, col: number) => number,
//     setSelected: any,
//     gap: boolean
// }


// function Column({colNum, gap, date, toptimes, bottomtimes, weight, getData, setSelected}: ColumnProps) {

//     return (
//         <div className="w-20" style={{marginRight: gap ? 10 : 0}}>
//             <p className="text-center mb-2 text-xs">{date}</p>
//             {toptimes.length > 0 && 
//                 <div className="mb-4">
//                     {toptimes.map((t, i) => <Cell setSelected={setSelected} weight={weight(i, colNum)} data={getData(i, colNum)} />)}
//                 </div>
//             }

//             {bottomtimes.map((t, i) => <Cell setSelected={setSelected} weight={weight(i+ toptimes.length, colNum)} data={getData(i + toptimes.length, colNum)} />)}
//         </div>
//     )
// }



// interface cellProps {
//     weight: number,
//     data: any,
//     setSelected: any
// }

// function Cell({weight, data, setSelected}: cellProps) {
//     const [open, setOpen] = useState(false)

//     if (window.innerWidth > 1000) {
//         return (
//             <div className={`h-6 border-2`} onMouseEnter={() => setSelected(data)} onMouseLeave={() => setSelected(null)}>
//                 <div style={{opacity: weight}} className={`h-full bg-red-500`}  />
//             </div>
//         )
//     }

//     return (
//         <>
//             <Drawer open={open} anchor="bottom" onClose={() => setOpen(false)}>
//                 <p>{data.date}</p>
//                 <p>{data.num}/{data.total}</p>
//                 {Array.from(data.users).map((u) => {
//                     return <p>{u as string}</p>
//                 })}
//             </Drawer>
//             <div className={`h-6 border-2`} onClick={() => setOpen(true)}>
//                 <div style={{opacity: weight}} className={`h-full bg-red-500`}  />
//             </div>
//         </>
//     ) 


// }