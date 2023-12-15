
const endpoint = "https://mcyvefz876.execute-api.us-east-2.amazonaws.com/prod/";

export async function createEventApi(title: string, start_date: string, end_date: string, start_time: string, end_time: string) {
    const event = {
        title,
        start_date,
        end_date,
        start_time,
        end_time,
        offset: new Date().getTimezoneOffset()
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

    await fetch(endpoint + id + "?offset=" + new Date().getTimezoneOffset()).then(async res => {
        output = await res.json()
    }).catch(e => {
        console.log(e)
        return null;
    });

    return output

}