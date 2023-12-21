
import { ComponentType, ReactElement, useState } from "react"
import { Event } from "../interfaces"
import { SetStateAction, Dispatch } from "react"
import { start } from "repl"

interface props {
    start_times: Array<Date>,
    num_blocks: number,
    Cell: ComponentType<datetime>
}

interface datetime {
    datetime: Date
}

export default function Calendar({start_times, num_blocks, Cell}: props) {

    let i = 0
    // const ogDate = start_times[0].toLocaleDateString().split("/")[1]
    const starting_block = 2 * start_times[0].getUTCHours() + 2 * start_times[0].getUTCMinutes() / 30
    const bottom_blocks = num_blocks + starting_block > 47 ? 48 - starting_block : num_blocks 
    const top_blocks = num_blocks - bottom_blocks


    const getTimeFromMidnight = (m: number) => {
        const d = new Date()
        d.setUTCHours(0, m, 0)
        return d
    }

    const getTimeFromStart = (m: number) => {
        const d = new Date(start_times[0])
        d.setMinutes(d.getMinutes() + m)
        return d
    }    

    const parseTime = (d: Date) => {
        const hours = d.getUTCHours() == 0 ? 12 : d.getUTCHours() % 12
        const minutes = d.getUTCMinutes().toString().padStart(2, '0')
        const x = d.getUTCHours() >= 12 ? "PM" : "AM"
        return `${hours}:${minutes} ${x}`
    }

    const parseDate = (d: Date) => {
        const day = d.getUTCDate()
        const month = d.getUTCMonth() + 1
        const year = d.getUTCFullYear().toString().slice(2)
        return `${month}/${day}/${year}`
    }


    // return (
    //     <table>
    //         <Row start_times={start_times} time={new Date()} Cell={DateCell} label={"Time"} />
    //         {Array.from(Array(top_blocks).keys()).map(t =>
    //             <Row start_times={start_times} time={getTimeFromMidnight(t*30)} label={parseTime(getTimeFromMidnight(t*30))} Cell={Cell} />
    //         )}
    //         <tr>
    //             <td>-----</td>
    //         </tr>
    //         {Array.from(Array(bottom_blocks).keys()).map(t =>
    //             <Row start_times={start_times} time={getTimeFromStart(30*t)} label={parseTime(getTimeFromStart(30*t))} Cell={Cell} />
    //         )}
    //     </table>
    // )

    interface DateInfo {
        date: string
        datetimes: (Date | null)[]
        connected: boolean
    }

    const dates: DateInfo[] = []
    for (let i=0; i < start_times.length; i++) {
        let d = new Date(start_times[i])
        if (dates.length > 0) {
            if (dates[dates.length - 1].date == parseDate(d)) {
                dates[dates.length-1].connected = true
            } else {
                for (let k=0; k < bottom_blocks; k++) {
                    dates[dates.length-1].datetimes.push(null)
                }
                const datetimes = []
                for (let k=0; k < top_blocks; k++) {
                    datetimes.push(null)
                }
                dates.push({
                    date: parseDate(d),
                    datetimes: datetimes,
                    connected: false
                })
            }
        } else {
            const datetimes = []
            for (let k=0; k < top_blocks; k++) {
                datetimes.push(null)
            }
            dates.push({
                date: parseDate(d),
                datetimes: datetimes,
                connected: false
            })
        }
        for (let j=0; j < num_blocks; j++) {
            const date = parseDate(d)
            if (dates.length > 0 && dates[dates.length-1].date == date) {
                dates[dates.length-1].datetimes.push(d)
            } else {
                dates[dates.length-1].connected = true
                dates.push({
                    date: date,
                    datetimes: [d],
                    connected: false
                })
            }
            d = new Date(d.getTime() + 30 * 60 * 1000)
        }
    }

    for (let k=0; k < bottom_blocks; k++) {
        dates[dates.length-1].datetimes.push(null)
    }

    return (
        <div>
            {dates.map(d => {

                return (
                    <div>
                        <p>{d.date}</p>
                        {d.datetimes.map(x => {

                            if (x) {
                                return (
                                    <p>A</p>
                                )
                            } else {
                                return (
                                    <p>B</p>
                                )
                            }
                            
                        })}
                    </div>
                )
            })}
        </div>
    )
}

// interface rowProps {
//     start_times: Array<Date>
//     time: Date,
//     Cell: ComponentType<datetime>,
//     label: string
// }

// function Row({start_times, time, Cell, label}: rowProps) {

//     const isOneDayApart = (d1: Date, d2: Date) => {
//         return d1.getTime() == d2.getTime() + 24*60*60*1000
//     }

//     return (
//         <tr>
//             <td>{label}</td>
//             {start_times.map((d, i) => {
//                 if (i != 0 && !isOneDayApart(d, start_times[i-1])) {
//                     return <td style={{marginLeft: 40, display: 'block'}}><Cell datetime={time} /></td>
//                 } else {
//                     return <td><Cell datetime={time} /></td>
//                 }
//             })}
//         </tr>
//     )
// }

// function DateCell({datetime}: datetime) {
//     const parseDate = (d: Date) => {
//         const day = d.getUTCDate()
//         const month = d.getUTCMonth() + 1
//         const year = d.getUTCFullYear().toString().slice(2)
//         return `${month}/${day}/${year}`
//     }

//     return <p>{parseDate(datetime)}</p>

// }