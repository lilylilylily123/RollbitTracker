import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/DisplayRobot.module.scss";
import LongRunner from "@/components/LongRunner";
import {useRouter} from "next/router";
import {setLazyProp} from "next/dist/server/api-utils";
import Loader from "@/components/Loader";
import PocketBase from "pocketbase";
import {getData} from "@/pages/api/robots/[id]";
import Info from "@/components/Info";
import Head from "next/head";

const pb = new PocketBase('http://127.0.0.1:8090');

const initialRobot = {
    data: [],
    records: [],
    robot_json: [],
    robot_id: [],
};



const DisplayRobot = ({ robotFull }) => {
    const [loading, setLoading] = useState(true);
    const [filterTrait, setFilterTrait] = useState([]);
    const router = useRouter();
    const {id} = router.query;
    // here it loads on second refresh, but not on first
    const robot = robotFull.robot_json.sportsbot;
    const traits = robotFull.robot_json.data.traits;
    const profitShare = robot.sportsbook_profit;
    const sportshares = traits[0].value;
    const freebet = traits[2].value;


    return (
        <div>
        <div className={styles.robot_container}>
            <Head>
                <title>{robot.name}</title>
                <meta name="description" content={robot.description} />
                {/*<meta name="viewport" content="width=device-width, initial-scale=1" />*/}
            </Head>
            <div className={styles.robot_image_parent}>
            <Image
                className={styles.robot_image}
                priority
                src={robot.image_full}
                alt={robot.name}
                width={350}
                height={350}
            />
            </div>
            <div className={styles.robot_body_parent}>
                <div className={styles.robot_body}>
                    <div className={styles.robot_title}>
                        <h1>{robot.name}</h1>
                    </div>
                    <Info trait={traits} />
                </div>
            </div>
            <div className={styles.robot_stats}>
                <div className={styles.robot_stats_title}>
                    <h1>Stats</h1>
                </div>
                <div className={styles.robot_stats_body}>
                    <div className={styles.stats_data}>
                        <h3>Profit Share</h3>
                        <p>{profitShare.toFixed(2)}</p>
                    </div>
                    <div className={styles.stats_data}>
                        <h3>Sportshares</h3>
                        <p>{sportshares}</p>
                    </div>
                    <div className={styles.stats_data}>
                        <h3>Freebet</h3>
                        <p>{freebet}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};




export default DisplayRobot;

export const getServerSideProps = async (ctx) => {
    const id = ctx.query.id;
    //getData returns a json object, all fields from object are valid
    const robotFull = await getData(id)
        .then(async (data) => {
            return data;
            })
    return {
      props: {
        robotFull,
      },
    };
};