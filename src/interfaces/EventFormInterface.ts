import { Dayjs } from "dayjs"
import { Control } from "react-hook-form"


export default interface CreateEventInterface {
    RHFController: Control<CreateEventFormDataInterface>,
    RHFSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}

export interface CreateEventFormDataInterface {
    title: string
    dates: Dayjs[],
    starttime: Dayjs | null,
    endtime: Dayjs | null,
    timezone: string
}