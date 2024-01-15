import Pocketbase from "pocketbase";

const pb = new Pocketbase('https://rollbit.pockethost.io')
export default async function handler(req, res) {
    const sport  = req.query.option
    pb.autoCancellation(false)
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
        return res.status(200).json({value: 1});
    }
    if (data.robot_json.sportsbot === undefined) {
        return res.status(200).json({value: -2});
    }
    const value = data.robot_json.sportsbot.sportsbook_profit;
    if (value === undefined) {
        return res.status(200).json({value: 0});
    }
    return res.status(200).json({value: value});
}