import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export default async function handler(req, res) {
    const { id } = req.query

    // const promise = new Promise((resolve) => {
    //     setTimeout(async () => {
    //         resolve(
    //         await pb.admins.authWithPassword('aksg656@icloud.com', 'goatGoat7&')
    //             .then(async () => {
    //                 const records = await pb.collection('robots').getFirstListItem('robot_id = ' + id, {
    //                     limit: 1,
    //                 }
    //                 )
    //                     .then(async (records) => {
    //                         await pb.collection('robots').delete(records.id)
    //                     })
    //                     .catch(async (err) => {
    //                         return res.status(500).json({ err });
    //                     });
    //             }),
    //         )
    //     }, 2000);
    // });
    const record = await promise;
    return res.status(200).json({ "deleted " : record });
}