
import { ComponentType, ReactElement, useState } from "react"
import { Event } from "../interfaces"
import { SetStateAction, Dispatch } from "react"

interface props {
    date_range: Array<string>,
    time_range: Array<string>,
    Cell: ComponentType<datetime>
}

interface datetime {
    datetime: string
}

export default function Calendar({date_range, time_range, Cell}: props) {

    return (
        <table>
            <tr>
                <th>Time</th>
                {date_range.map(d => <th>{d}</th>)}
            </tr>
            {time_range.map(t =>
                <tr>
                    <td>{t}</td>
                    {date_range.map(d => <td>{<Cell datetime={d + " " + t} />}</td>)}
                </tr>
                
            )}
        </table>
    )
}

