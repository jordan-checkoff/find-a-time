import { Event } from "../interfaces/interfaces";
import ViewCalendar from "./ViewCalendar";


interface props {
    data: Event,
    timezone: string
}


export default function ViewAvailability({data, timezone}: props) {

    return (
        <div className="p-10">
            <ViewCalendar data={data} timezone={timezone} />
        </div>
    )
}