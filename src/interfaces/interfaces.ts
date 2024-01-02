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
    onChange: (...event: any[]) => void
    error: string | undefined,
    label: string
}

export interface ReducerAction<T> {
    action: T
    value: any
}