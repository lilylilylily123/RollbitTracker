import {letsTryAgain} from "@/pages/api/robots/[id]";
import PocketBase from "pocketbase";
import {useEffect} from "react";

export default function Test({robotFull}) {

    const robot = robotFull.attributes;
    const sportshare = robot[10].value;
    // const profitshare = sportshare *
    return (
        <div>
            <h1>Test</h1>
        </div>
    )
}


export const getServerSideProps = async (ctx) => {
    const id = 69;
    const robotFull = await letsTryAgain(id)
        .then(async (data) => {
            return data;
        })
    return {
        props: {
            robotFull,
        },
    };
}

const delayFetch = (url, options) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(fetch(url, options));
        }, options.delay);
    });


export async function maybethisworks() {
    const arr = [
        104, 1052, 1050, 115, 11, 1122, 1179, 1086, 1922,
        1116, 1032, 1083, 1141, 7166, 1212, 1133, 1349, 1142, 2161, 1249,
        1060, 1411, 1271, 89, 9428, 8988, 8583, 2458, 6306, 2647, 1523,
        1640
    ];
    arr.forEach((value, index) => {
        const url = `http://0.0.0.0:8000/robots/${value}`;
        delayFetch(url, {delay: 3000 * index})
            .then((res) => res.json())
            .then(async (data) => {
                console.log(index)
                const dataDB = {
                    "robot_json": data,
                    "robot_id": value
                }
                await pb.collection('robot_historical').create(dataDB);
    })
    })

    // console.log(allOfThem)
}