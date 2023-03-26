import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/DisplayRobot.module.scss";
import LongRunner from "@/components/LongRunner";
import RobotNotFound from "@/components/RobotNotFound/notFound";
import {useRouter} from "next/router";
import {setLazyProp} from "next/dist/server/api-utils";
import Calculator from "@/components/Calculator/Calculator.js";
import Loader from "@/components/Loader";
import PocketBase from "pocketbase";
import {getData} from "@/pages/api/robots/[id]";
import Info from "@/components/Info";
import Head from "next/head";
import Error from "next/error";
import {checkWithCookie, finalCreateBot} from "@/pages/api/testing/[id]";
import {AiOutlineStar, AiFillStar} from "react-icons/ai";
import RoiCalculator from "@/components/RoiCalculator/RoiCalculator";
import {serialize} from "cookie";
import {createCookie} from "@/pages/api/db/create/[id]";
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';

const pb = new PocketBase('http://127.0.0.1:8090');

const initialRobot = {
    data: [],
    records: [],
    robot_json: [],
    robot_id: [],
};



const DisplayRobot = ({ robotFull }) => {
    const router = useRouter();
    const {id} = router.query;
    const [favorite, setFavorite] = useState(false);

    // here it loads on second refresh, but not on first
    const robot = robotFull.robot_json.sportsbot;
    if (robot === undefined) {
        return <RobotNotFound id={id}/>
    }
    const traits = robotFull.robot_json.data.traits;
    if (traits === undefined) {
        return <RobotNotFound id={id}/>
    }
    const profitShare = robot.sportsbook_profit;
    if (profitShare === undefined) {
        // console.log("wtf!x2")
        return <RobotNotFound id={id}/>
    }
    const sportshares = robot.sportshares;
    const freebet = robot.freebet_amount;

    const [returnValue, setReturn] = useState(0);
    if (!robotFull) { return <Loader /> }

    return (
        <div className={styles.page}>
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
        <div id={"favorite_button"} className={styles.favorite_button} onClick={() => {
            setFavorite(!favorite);
            const div = document.getElementById("favorite_button");
            if (!favorite) {
                appendToStorage("favorites", robotFull.robot_id + ",");
                div.style.color = "yellow";
            } else {
                let old = localStorage.getItem("favorites");
                div.style.color = "white";
                if (old === null) old = "";
                old = old.replace(robotFull.robot_id + ",", "");
                localStorage.setItem("favorites", old);
            }
        }}>
           <AiFillStar/>
        </div>
        </div>
        <div className={styles.calculator_container}>
            <Calculator fullRobot={robotFull} setReturn={setReturn} />
        </div>
        <div className={styles.roi_calc_container}>
            <RoiCalculator fullRobot={robotFull} returnValue={returnValue}/>
            {returnValue}
        </div>
        </div>
    );
};




export default DisplayRobot;

export const getServerSideProps = async (ctx) => {
    const id = ctx.query.id;
    // getData returns a json object, all fields from object are valid
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

function appendToStorage(name, data){
    let old = localStorage.getItem(name);
    if(old === null) old = "";
    localStorage.setItem(name, old + data);
}