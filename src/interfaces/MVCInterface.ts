import { ReducerAction } from "./interfaces";


export default interface MVCInterface<T, U> {
    model: T,
    handleEvent: (x: ReducerAction<U>) => void
}