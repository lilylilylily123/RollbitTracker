import Pocketbase from "pocketbase";

const pb = new Pocketbase("https://rollbit.pockethost.io");

export default async function handler(req, res) {
    await pb.admins.authWithPassword("cfrugal11@gmail.com", "examplePassword");
    const record = await pb.collection("total_data").getFullList();
    res.status(200).json({record});
}