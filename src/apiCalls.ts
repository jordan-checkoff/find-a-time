
const endpoint = "https://mcyvefz876.execute-api.us-east-2.amazonaws.com/prod/";

export function createEventApi(title: string, start_datetime: number, end_datetime: number) {
    const event = {
        title,
        start_datetime,
        end_datetime
    }

    fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
            "Content-Type": "application/json",
        },
    }).then(res => {
        return res.json()
    }).catch(e => {
        console.log(e)
        return null;
    });

}