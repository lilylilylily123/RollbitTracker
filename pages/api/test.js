import {totalShareLists} from "/pages/api/total";

export default async function handler(req, res) {
    await totalShareLists()
        .then((response) => console.log(response))
    res.status(200).json({data: "hello"})
}