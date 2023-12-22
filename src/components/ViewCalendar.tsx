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
        const users = data.availability_by_time.get(datetime.valueOf())
        
        return (
            <div>
                <p>
                    {users && users.size > 0 ? Array.from(users).map(x => <span>{x}</span>) : " "}
                </p>
            </div>
        )
    }

    return (
        <Calendar start_times={data.start_times} num_blocks={data.num_blocks} Cell={AvailabilityCell} />
    )
}