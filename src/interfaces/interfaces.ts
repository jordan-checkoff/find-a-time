import { Dayjs } from "dayjs";
import { ChangeEventHandler, Ref } from "react";

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