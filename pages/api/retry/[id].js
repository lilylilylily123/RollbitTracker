import {deleteRobot, getData} from '../robots/[id]';
//* legit just deletes in case of edge case / ratelimiting
export default async function handler(req, res) {
    const {id} = req.query
    await deleteRobot(id);
    const data = await getData(id);
    return res.status(200).json({ data: data });
}