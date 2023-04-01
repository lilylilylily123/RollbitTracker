import PocketBase from 'pocketbase';

const pb = new PocketBase('https://rollbit.pockethost.io');

export default async function handler(req, res) {
    const { id } = req.query
    // console.log(id)
    const response = await fetch(`http://0.0.0.0:8000/robots/${id}`);
    const data = await response.json();
    const dataDB = {
        "robot_json": data,
        "robot_id": id
    }

    const time = new Date();
    const dataHistorical = {
        "robot_json": data,
        "robot_id": id,
        "entry_time": time.toUTCString()
    }
    //! env stuff is my pocketbase auth
    const authData = await pb.admins.authWithPassword(process.env.DB_USER, process.env.DB_PASS);

    await pb.collection('robot_historical').create(dataHistorical);
    const record = await pb.collection('robots').create(dataDB);
    return await res.status(200).json({ record});
}

export async function createBot(id) {
    pb.autoCancellation(false)
    await pb.admins.authWithPassword(process.env.DB_USER, process.env.DB_PASS);
    const response = await fetch(`http://0.0.0.0:8000/robots/${id}`, {
    });
    const time = new Date();
    const data = await response.json();
    const dataDB = {
        "robot_json": data,
        "robot_id": id
    }
    const dataHistorical = {
        "robot_json": data,
        "robot_id": id,
        "entry_time": time.toUTCString()
    }

    await pb.collection('robot_historical').create(dataHistorical);
    const record = await pb.collection('robots').create(dataDB);
    return record;
}