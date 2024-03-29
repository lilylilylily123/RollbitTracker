import PocketBase from "pocketbase";

const pb = new PocketBase('https://rollbit.pockethost.io');
pb.autoCancellation(false)
export default async function handler(req, res) {
    const { id } = req.query
    if (!id) {
        return res.status(400).json({ err: 'No id provided' });
    }
    const data = await letsTryAgain(id);
    return res.status(200).json({ data: data });
}

async function createThisBot(id) {
    const response = await fetch(`https://sportsbot.rollbit.com/metadata/${id}`)
    const data = await response.json();
    const robot_json = {
        "robot_json": data,
        "robot_id": id
    }
    await pb.admins.authWithPassword("cfrugal11@gmail.com", "examplePassword");
    const record = pb.collection('robots_v2').create(robot_json)
        .then(async (record) => {
            return record;
        })
    return record;
}

export async function letsTryAgain(id) {
    await pb.admins.authWithPassword("cfrugal11@gmail.com", "examplePassword");
    const now = new Date();
    const record = await pb.collection('robots_v2').getFirstListItem('robot_id = ' + id)
        .then(async (record) => {
            const update = record.created;
            const diff = now.getTime() - Date.parse(update);
            if (diff > 900 * 1000) {
                await deleteRobot(id);
                return await createThisBot(id);
            } else {
                return record;
            }
        })
        .catch(async (err) => {
            return createThisBot(id);
        })
    return await JSON.parse(JSON.stringify(record));
}

export async function getValue(sport) {
    await pb.admins.authWithPassword("cfrugal11@gmail.com", "examplePassword");
    const record = await pb.collection('robot_historical').getFirstListItem(`sport="${sport}"`)
        .then(async (record) => {
            return record;
        })
        .catch(async (err) => {
            return err;
        })
    const data = JSON.parse(JSON.stringify(record));
    if (data.robot_json === undefined) {
        return 1;
    }
    if (data.robot_json.sportsbot === undefined) {
        return -2;
    }
    const value = data.robot_json.sportsbot.sportsbook_profit;
    if (value === undefined) {
        return 0;
    }
    return value;
}
async function deleteRobot(id) {
    await pb.collection('robots_v2').getFirstListItem('robot_id = ' + id, {
            // limit: 1,
        }
    )
        .then(async (records) => {
            await pb.collection('robots_v2').delete(records.id)
        })
}