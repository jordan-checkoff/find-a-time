import { Event } from "../interfaces";
import Calendar from "./Calendar";

interface props {
    data: Event
}

interface datetime {
    datetime: string
}



export default function ViewCalendar({data} : props) {


    function AvailabilityCell({datetime} : datetime) {
        const users = data.availability_by_time.get(datetime)
        
        return (
            <div>
                {users && Array.from(users).map(x => <p>{x}</p>)}
            </div>
        )
    }

    return (
        <Calendar date_range={data.date_range} time_range={data.time_range} Cell={AvailabilityCell} />
    )
}