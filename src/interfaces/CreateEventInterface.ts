import { Dayjs } from "dayjs"


export default interface CreateEventInterface {
    title: string
    dates: Dayjs[],
    starttime: Dayjs | null,
    endtime: Dayjs | null
}