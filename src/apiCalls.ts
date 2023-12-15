
const endpoint = "https://mcyvefz876.execute-api.us-east-2.amazonaws.com/prod/";

export async function createEventApi(title: string, start_datetime: number, end_datetime: number) {
    const event = {
        title,
        start_datetime,
        end_datetime
    }

    let output = null

    await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
            "Content-Type": "application/json",
        },
    }).then(async res => {
        output = await res.json()
    }).catch(e => {
        console.log(e)
        return null;
    });

    return output
}


export async function viewEventApi(id: string) {

    let output = null;

    await fetch(endpoint + id).then(async res => {
        output = await res.json()
    }).catch(e => {
        console.log(e)
        return null;
    });

    return output

}