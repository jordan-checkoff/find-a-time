export interface Event {
    id: string,
    title: string,
    date_range: Array<string>,
    time_range: Array<string>,
    availability_by_user: Map<string, Set<string>>,
    availability_by_time: Map<string, Set<string>>
}