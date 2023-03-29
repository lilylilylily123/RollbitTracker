import React, {useEffect, useState} from "react";
import Image from "next/image";
import styles from "@/styles/DisplayRobot.module.scss";
import RobotNotFound from "@/components/RobotNotFound/notFound";
import {useRouter} from "next/router";
import Calculator from "@/components/Calculator/Calculator.js";
import Loader from "@/components/Loader";
import PocketBase from "pocketbase";
import {getData} from "@/pages/api/robots/[id]";
import Info from "@/components/Info";
import Head from "next/head";
import {AiFillStar} from "react-icons/ai";
import RoiCalculator from "@/components/RoiCalculator/RoiCalculator";
import Nav from "@/components/Navbar/Nav";

const pb = new PocketBase('http://127.0.0.1:8090');

const initialRobot = {
    data: [],
    records: [],
    robot_json: [],
    robot_id: [],
};

const DisplayRobot = ({robotFull}) => {
    const router = useRouter();
    const {id} = router.query;
    const [favorite, setFavorite] = useState(false);

    //*everything from here down is favorites logic
    useEffect(() => {
        const div = document.getElementById("favorite_button");
        if (div === null) return;
        if (sessionStorage.getItem("favorites") === null) {
            sessionStorage.setItem("favorites", "");
            setFavorite(true);
        } else if (!sessionStorage.getItem("favorites").includes(id)) {
            setFavorite(true);
        } else if (sessionStorage.getItem("favorites") === null) {
            setFavorite(false);
        }
    }, [id]);

    useEffect(() => {
        const div = document.getElementById("favorite_button");
        if (div === null) return;
        if (!favorite) {
            if (sessionStorage.getItem("favorites") === null) {
                appendToStorage("favorites", robotFull.robot_id + ",");
                div.style.color = "yellow";
            } else if (sessionStorage.getItem("favorites").includes(id)) {
                div.style.color = "yellow";
            } else if (!sessionStorage.getItem("favorites").includes(id)) {
                appendToStorage("favorites", robotFull.robot_id + ",");
                div.style.color = "yellow";
            }

        } else {
            let old = sessionStorage.getItem("favorites");
            div.style.color = "white";
            if (old === null) old = "";
            old = old.replace(robotFull.robot_id + ",", "");
            sessionStorage.setItem("favorites", old);
        }
    }, [favorite]);
    const [returnValue, setReturn] = useState(0);
    //*to here


    //! error handling
    if (robotFull.robot_json.error?.doc !== undefined) {
        return <RobotNotFound id={id}/>
    }

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
        return <RobotNotFound id={id}/>
    }
    const sportshares = robot.sportshares;
    const freebet = robot.freebet_amount;

    if (!robotFull) {
        return <Loader/>
    }
    //! end error handling

    return (
        <div className={styles.page}>
            <div className={styles.robot_container}>
                <Head>
                    <title>{robot.name}</title>
                    <meta name="description" content={robot.description}/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
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
                <div id={"favorite_button"} className={styles.favorite_button} onClick={() => setFavorite(!favorite)}>
                    <AiFillStar/>
                </div>
                <div className={styles.robot_body_parent}>
                    <div className={styles.robot_body}>
                        <div className={styles.robot_title}>
                            <h1>{robot.name}</h1>
                        </div>
                        <Info trait={traits}/>
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
            <div className={styles.calculator_container}>
                <Calculator fullRobot={robotFull} setReturn={setReturn}/>
            </div>
            <div className={styles.lower_level_container}>
                <div className={styles.roi_calc_container}>
                    <RoiCalculator fullRobot={robotFull} returnValue={returnValue}/>
                </div>

                <div className={styles.navigation_container}>
                    <Nav track={true} search={true}/>
                </div>
            </div>
        </div>
    );
};


export default DisplayRobot;

export const getServerSideProps = async (ctx) => {
    const id = ctx.query.id;
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

function appendToStorage(name, data) {
    let old = sessionStorage.getItem(name);
    if (old === null) old = "";
    sessionStorage.setItem(name, old + data);
}

function checkStorageId(id) {
    let old = sessionStorage.getItem("favorites");
    if (old === null) old = "";
    return old.includes(id);
}