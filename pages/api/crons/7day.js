import PocketBase from "pocketbase";

export default async function handler(req, res) {
    const start = new Date();
    const pb = new PocketBase('https://rollbit.pockethost.io');
    await pb.admins.authWithPassword("aksg656@icloud.com", "goatGoat7&");
    pb.autoCancellation(false)
    const record = await pb.collection('robot_historical').getFullList();
    const rec2 = await pb.collection('sevendayps').getFullList();
    for (const item of rec2) {
        await pb.collection('sevendayps').delete(item.id)
    }
    for (const item of record) {
        const dataDB = {
            "sport": item.sport,
            "profitshare": item.robot_json.sportsbot.sportsbook_profit,
        }
        await pb.collection('sevendayps').create(dataDB);
    }
    const end = new Date();
    const time = end - start;
    res.status(200).json({timefordata: time * 0.001 + "s"});
}