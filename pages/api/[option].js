import PocketBase from "pocketbase";

const pb = new PocketBase('https://rollbit.pockethost.io');
export default async function handler(req, res) {
    const { option } = req.query
    if (!option) {
        return res.status(400).json({ err: 'No option provided' });
    }
    const authData = await pb.admins.authWithPassword(process.env.DB_USER, process.env.DB_PASS);
    let data = await pb.collection('amount_bots').getFirstListItem(`sport="${option}"`)
        .then(async (record) => {
            return record;
        })
        .catch(async (err) => {
            console.log(err)
        })
    data = JSON.parse(JSON.stringify(data.historical_json));

    return res.status(200).json({ data });
}