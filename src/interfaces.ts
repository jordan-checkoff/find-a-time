export interface Event {
    id: string,
    title: string,
    date_range: Array<string>,
    time_range: Array<string>,
    availability_by_user: Map<string, Array<string>>,
    availability_by_time: Map<string, Array<string>>
}