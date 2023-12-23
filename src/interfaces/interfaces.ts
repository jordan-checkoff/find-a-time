import { Dayjs } from "dayjs";
import { ChangeEventHandler, Ref } from "react";

export interface Event {
    id: string,
    title: string,
    start_times: Array<Dayjs>,
    num_blocks: number,
    availability_by_user: Map<string, Set<number>>,
    availability_by_time: Map<number, Set<string>>
}

export interface InputProps<T> {
    value: T,
    onChange: ChangeEventHandler<HTMLInputElement>
    name: string,
    ref: Ref<HTMLInputElement>,
    error: string | undefined
}