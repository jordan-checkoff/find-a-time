import { useEvent } from "./EventContext"

export default function TimeColumn() {

    const {calendar} = useEvent()

    const toptimes = calendar.get_top_blocks()
    const bottomtimes = calendar.get_bottom_blocks()

    return (
        <div className="text-nowrap text-right mr-2">
            <div className="mb-6" />
                {toptimes.length > 0 && 
                    <div className="mb-3">
                        {bottomtimes.map(x => x && <p className="mb-6 text-xs">{x}</p>)}
                    </div>
                }
            <div>
                {bottomtimes.map(x => x && <p className="mb-6 text-xs">{x}</p>)}
            </div>
        </div>
    )
}