import PocketBase from "pocketbase";

export default function handler(request, response) {
    const pb = new PocketBase('http://127.0.0.1:8090');
    pb.admins.authWithPassword("aksg656@icloud.com", "goatGoat7&");
    pb.autoCancellation(false)
    const arr = [
        7166,
        2647, 1523, 1212, 1133, 1349, 1142, 2161, 1249, 1640
    ];
    arr.forEach((value, index) => {
        const url = `http://0.0.0.0:8000/robots/${value}`;
        delayFetch(url, {delay: 3000 * index})
            .then((res) => res.json())
            .then(async (data) => {
                console.log(index)
                const dataDB = {
                    "robot_json": data,
                    "robot_id": value
                }
                await pb.collection('robot_historical').create(dataDB);
            })
    })
}

const delayFetch = (url, options) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(fetch(url, options));
        }, options.delay);
    });