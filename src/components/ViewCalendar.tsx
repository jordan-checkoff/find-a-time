import { Dayjs } from "dayjs";
import { Event } from "../interfaces";
import Calendar from "./Calendar";

interface props {
    data: Event
}

interface datetime {
    datetime: Dayjs
}



export default function ViewCalendar({data} : props) {


    function AvailabilityCell({datetime} : datetime) {
        // const users = data.availability_by_time.get(datetime)
        
        return (
            <div>
                {/* {users && Array.from(users).map(x => <p>{x}</p>)} */}
                <p>A</p>
            </div>
        )
    }

    return (
        <Calendar start_times={data.start_times} num_blocks={data.num_blocks} Cell={AvailabilityCell} />
    )
}