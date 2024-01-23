import { Dispatch, SetStateAction } from "react";
import Button from "../common/Button";
import { useEvent } from "./EventContext";


interface props {
    start: number,
    setStart: Dispatch<SetStateAction<number>>
}

export default function NavButtons({start, setStart}: props) {

    const { calendar } = useEvent()

    return (
        <div className="w-full">
            <div className="grid grid-cols-2 gap-2 mb-4">
                <Button onClick={() => setStart(start - 1)} text="&larr; Previous" disabled={start == 0} />
                <Button onClick={() => setStart(start + 1)} text="Next &rarr;" disabled={start + calendar.get_num_cols() >= calendar.dates.length} />
            </div>
        </div>
    )
}