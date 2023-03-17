import PocketBase from "pocketbase";
import {createBot} from "@/pages/api/db/create/[id]";
import {create} from "axios";

const pb = new PocketBase('http://127.0.0.1:8090');
export default async function handler(req, res) {
    pb.autoCancellation(false)
    const { id } = req.query
    if (!id) {
        return res.status(400).json({ err: 'No id provided' });
    }
    const data = await getData(id);
    return res.status(200).json({ data: data });
}


export async function getData(id) {
    pb.autoCancellation(false)
    const authData = await pb.admins.authWithPassword('aksg656@icloud.com', 'goatGoat7&');
    const record = await pb.collection('robots').getFirstListItem('robot_id = ' + id, {
        limit: 1,
    })
        .then(async (record) => {
            // check records for creation date
            const update = record.created;
            const now = new Date();
            const diff = now.getTime() - Date.parse(update);
            if (diff > 900000) {
                await deleteRobot(id);
                return await createBot(id);
            } else {
                // console.log("2")
                return await stringToJSON(record);
            }
        })
        .catch(async (err) => {
            return await createBot(id);
        });
    // console.log(record)
    // console.log(typeof (JSON.parse(JSON.stringify(record))))
    return (JSON.parse(JSON.stringify(record, null, 2)));
}

async function deleteRobot(id) {
    await pb.admins.authWithPassword('aksg656@icloud.com', 'goatGoat7&')
           await pb.collection('robots').getFirstListItem('robot_id = ' + id, {
                    limit: 1,
                }
            )
                .then(async (records) => {
                    await pb.collection('robots').delete(records.id)
                })
                .catch(async (err) => {
                    console.log(err)
                });
}

function stringToJSON(record) {
    return new Promise((resolve, reject) => {
        if (record) {
            resolve(JSON.parse(JSON.stringify(record)))
        } else {
            reject("No record found")
        }
    })
}