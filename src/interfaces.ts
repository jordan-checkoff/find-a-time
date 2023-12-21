import { Dayjs } from "dayjs";

export interface Event {
    id: string,
    title: string,
    start_times: Array<Dayjs>,
    num_blocks: number,
    availability_by_user: Map<string, Set<string>>,
    availability_by_time: Map<string, Set<string>>
}