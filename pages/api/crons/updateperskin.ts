import Pocketbase from "pocketbase";
const pb = new Pocketbase("https://rollbit.pockethost.io");

export default async function handler(req, res) {
    await pb.autoCancellation(false)
    const t0 = new Date().getTime()
    await pb.admins.authWithPassword("cfrugal11@gmail.com", "jacksonMike123");
    const record = await pb.collection("amount_bots").getFullList()
    const record2 = await pb.collection("robot_historical").getFullList()
    let todayDate = new Date().toISOString().slice(0, 10);
    record.forEach((item) => {
        record2.forEach((item2) => {
                    if (item2.sport === item.sport) {
                        const myOtherLabels = []
                        const myOtherData = []
                        Object.entries(item.historical_json).forEach((key, value) => {
                            myOtherLabels.push(key[0])
                            myOtherData.push(key[1])
                        })
                        myOtherLabels.push(todayDate)
                        myOtherData.push(Number(parseFloat(item2.robot_json.sportsbot.sportsbook_profit).toFixed(2)))
                        const myData = {}
                        myOtherLabels.forEach((label, index) => {
                            myData[label] = myOtherData[index];
                        });
                        const updatedRecord = pb.collection("amount_bots").update(item.id, {historical_json: myData})
                    }
                })
    })

    const end = new Date().getTime()
    const time = (end - t0) * 0.001
    console.log(time)
    res.status(200).json({timefordata: time});
}