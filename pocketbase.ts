import Pocketbase from 'pocketbase';

export const pb = new Pocketbase("https://rollbit.pockethost.io")
pb.autoCancellation(false)
pb.admins.authWithPassword("cfrugal11@gmail.com", "examplePassword")
    .then(() => {
    console.log("Admin auth")
})