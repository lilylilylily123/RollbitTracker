import Pocketbase from "pocketbase"
const pb = new Pocketbase("https://rollbit.pockethost.io")
pb.autoCancellation(false)
import {AmountBots} from "../../misc/AmountBots"
export default async function handler(req, res) {
    const authData = await pb.admins.authWithPassword("cfrugal11@gmail.com", "examplePassword");
    const record = await pb.collection("amount_bots").getFullList()
    const record2 = await pb.collection("robot_historical").getFullList()
    const record3 = await pb.collection('yesterday_ps').getFullList()
    const record4 = await pb.collection('sevendayps').getFullList()

    const thing = []
    record.forEach((item) => {
        record2.forEach((item2) => {
           record3.forEach((item3) => {
               record4.forEach((item4) => {
                   if (item2.sport === item.sport && item.sport === item3.sport && item4.sport === item.sport) {
                       thing.push([item.sport, item.amount, item.shares, item2.robot_json.sportsbot.sportsbook_profit, item3.profitshare, item4.profitshare])
                   }
               })
           })
        }
    )})
    const uniqueArray = thing.filter((item, index, self) => {
        return self.findIndex(innerItem => innerItem[0] === item[0]) === index;
    });
    res.status(200).json({uniqueArray, total: record.length})
}

export async function totalShareLists() {
    await pb.admins.authWithPassword("cfrugal11@gmail.com", "examplePassword");
    await pb.autoCancellation(false)
    const record = await pb.collection("amount_bots").getFullList()
    const record2 = await pb.collection("robot_historical").getFullList()
    const record3 = await pb.collection('yesterday_ps').getFullList()
    const record4 = await pb.collection('sevendayps').getFullList()

    const thing = []
     record.forEach((item) => {
        record2.forEach((item2) => {
                record3.forEach((item3) => {
                    record4.forEach((item4) => {
                        if (item2.sport === item.sport && item.sport === item3.sport && item4.sport === item.sport) {
                            thing.push([item.sport, item.amount, item.shares, item2.robot_json.sportsbot.sportsbook_profit, item3.profitshare, item4.profitshare])
                        }
                    })
                })
            }
        )
    })
    const uniqueArray = thing.filter((item, index, self) => {
        return self.findIndex(innerItem => innerItem[0] === item[0]) === index;
    });
    return JSON.parse(JSON.stringify(uniqueArray));
}