import {pb} from "/pocketbase"
export default async function handler(request, response) {
    const start = new Date();
    const arr = [
        8009,
        7166, 1212, 1133, 1349, 1142, 2161, 1249,
        1060, 1411, 1271, 6782, 9428, 8988, 8583, 2458, 6306, 2647, 1523,
        1640
    ];
    const timer = ms => new Promise(res => setTimeout(res, ms))
    for (const value of arr) {
        const index = arr.indexOf(value);
        const url = `http://0.0.0.0:8000/robots/${value}`;
        await deleteHistory(value, pb);
        delayFetch(url, {delay: 6000 * index})
            .then((res) => res.json())
            .then(async (data) => {
                console.log(index)
                if (data.sportsbot.traits === undefined) {
                    data.sportsbot.traits = "retry"
                }
                if (data.sportsbot.traits.sport === undefined) {
                    data.sportsbot.traits.sport = "retry"
                }
                console.log(data.sportsbot.traits.sport)
                const dataDB = {
                    "robot_json": data,
                    "robot_id": value,
                    "sport": data.sportsbot.traits.sport,
                }
                await pb.collection('robot_historical').create(dataDB);
            })
        await timer(20 * 1000)
    }
    const end = new Date();
    const time = end - start;
    console.log(time)
    response.status(200).json({timefordata: time * 0.001 + "s"});
}

async function deleteHistory(id) {
    await pb.collection('robot_historical').getList(1, 50, {
        filter: 'robot_id = ' + id,
    })
        .then(async (records) => {
            for (const record of records.items) {
                await pb.collection('robot_historical').delete(record.id)
            }
        })
        .catch(async (err) => {
            console.log("robot_id " + id + " not found in robot_historical, error: " + err)
        });
}

const delayFetch = (url, options) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(fetch(url, options));
        }, options.delay);
    });