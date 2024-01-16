import { Dispatch, SetStateAction, useState } from "react"
import TimezoneInput from "../common/TimezoneInput"
import Button from "../common/Button"
import { useEvent } from "./EventContext"

interface props {
    timezone: string,
    setTimezone: Dispatch<SetStateAction<string>>
}

export default function EventHeader({timezone, setTimezone}: props) {

    const [copied, setCopied] = useState(false)

    const event = useEvent()

    const addToClipboard = () => {
        window.navigator.clipboard.writeText(window.location.href);
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="bg-gray-100 flex flex-col md:flex-row justify-between px-8 py-4">
            <p className="text-2xl self-center">{event.title}</p>
            <div className="flex flex-col md:flex-row md:items-end gap-4">
                <TimezoneInput value={timezone} onChange={(x) => setTimezone(x)} fullWidth={window.innerWidth < 768 && true} />
                <div className="md:w-40">
                    {copied && <p className="text-xs">Copied to clipboard</p>}
                    <Button text={"Share Event"} onClick={addToClipboard} />
                </div>
            </div>
        </div>
    )
}