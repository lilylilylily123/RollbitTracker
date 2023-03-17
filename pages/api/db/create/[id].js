import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export default async function handler(req, res) {
    const { id } = req.query
    // console.log(id)
    const response = await fetch(`http://0.0.0.0:8000/robots/${id}`);
    const data = await response.json();
    const dataDB = {
        "robot_json": data,
        "robot_id": id
    }

    const authData = await pb.admins.authWithPassword('aksg656@icloud.com', 'goatGoat7&');


    const record = await pb.collection('robots').create(dataDB);
    return await res.status(200).json({ record});
}

export async function createBot(id) {
    pb.autoCancellation(false)
    await pb.admins.authWithPassword('aksg656@icloud.com', 'goatGoat7&');
    const response = await fetch(`http://0.0.0.0:8000/robots/${id}`);
    const data = await response.json();
    const dataDB = {
        "robot_json": data,
        "robot_id": id
    }
    const record = await pb.collection('robots').create(dataDB);
    return record;
}