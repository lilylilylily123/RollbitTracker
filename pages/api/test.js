import {totalShareLists} from "/pages/api/total";

export default async function handler(req, res) {
    let total = 0;
    await totalShareLists()
        .then((response) => {
            response.forEach((item) => {
                total += item[2] * item[3];
                console.log(total)
            })
        })

    res.status(200).json({data: "hello"})
}