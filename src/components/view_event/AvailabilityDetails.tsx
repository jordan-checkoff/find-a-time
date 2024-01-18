import { Dayjs } from "dayjs";


interface props {
    users: Set<string>,
    date: Dayjs,
    num: number,
    total: number
}

export default function AvailabilityDetails({date, num, total, users}: props) {

    return (
        <div>
            <p className="text-lg font-bold mb-2">{date.format("M/D/YY h:mm A")}</p>
            <p className="mb-4">{num}/{total} people available</p>
            <ul className="list-disc list-inside ml-4">
                {Array.from(users).map(u => <li>{u}</li>)}
            </ul>
        </div>
    )
}