import Pocketbase from "pocketbase";
import {totalShareLists} from "./total";

const pb = new Pocketbase("https://rollbit.pockethost.io")
export default async function handler(req, res) {
    await pb.admins.authWithPassword("cfrugal11@gmail.com", "jacksonMike123");
    const record = await pb.collection("total_data").getFullList()
    let total = 0;
    await totalShareLists()
    .then((response) => response.json())
    .then((data) => {
        data.forEach((item) => {
            total += item[2] * item[3];
        })
    })
    let todayDate = new Date().toISOString().slice(0, 10);
    const myOtherLabels = []
    const myOtherData = []
    Object.entries(record[0].historical).forEach((key, value) => {
        myOtherLabels.push(key[0])
        myOtherData.push(key[1])
    })
    myOtherLabels.push(todayDate)
    myOtherData.push(total)
    const myData = {}
    myOtherLabels.forEach((label, index) => {
        myData[label] = myOtherData[index];
    });
    const updatedRecord = await pb.collection("total_data").update(record[0].id, {historical: myData})
    return res.status(200).json(updatedRecord);
}