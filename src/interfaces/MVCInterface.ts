

export default interface MVCInterface<T, U> {
    model: T,
    handleEvent: (x: U) => void
}