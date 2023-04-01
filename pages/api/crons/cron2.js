import PocketBase from "pocketbase";

export default async function handler(request, response) {
    const start = new Date();
    const pb = new PocketBase('https://rollbit.pockethost.io');
    await pb.admins.authWithPassword("aksg656@icloud.com", "goatGoat7&");
    pb.autoCancellation(false)
    const arr = [
        104, 1052, 1050, 115, 11, 1122, 1179, 1086, 1922,
        1116, 1032, 1083, 1141, 7166, 1212, 1133, 1349, 1142, 2161, 1249,
        1060, 1411, 1271, 89, 9428, 8988, 8583, 2458, 6306, 2647, 1523,
        1640
    ];
    const timer = ms => new Promise(res => setTimeout(res, ms))
    for (const value of arr) {
        const index = arr.indexOf(value);
        const url = `http://0.0.0.0:8000/robots/${value}`;
        await deleteHistory(value, pb);
        delayFetch(url, {delay: 5000 * index})
            .then((res) => res.json())
            .then(async (data) => {
                console.log(index)
                if (data.sportsbot.traits === undefined) {
                    data.sportsbot.traits = "retry"
                }
                if (data.sportsbot.traits.sport === undefined) {
                    data.sportsbot.traits.sport = "retry"
                }
                console.log(data.sportsbot.traits)
                const dataDB = {
                    "robot_json": data,
                    "robot_id": value,
                    "sport": data.sportsbot.traits.sport,
                }
                await pb.collection('robot_historical').create(dataDB);
            })
        await timer(10 * 1000)
    }
    const end = new Date();
    const time = end - start;
    console.log(time)
    response.status(200).json({timefordata: time});
}

async function deleteHistory(id, pb) {
    await pb.collection('robot_historical').getFirstListItem('robot_id = ' + id, {
            limit: 1,
        }
    )
        .then(async (records) => {
            await pb.collection('robot_historical').delete(records.id)
        })
        .catch(async (err) => {
            console.log("robot_id " + id + " not found in robot_historical")
        });
}

const delayFetch = (url, options) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(fetch(url, options));
        }, options.delay);
    });