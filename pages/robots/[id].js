import React, {useEffect, useState} from "react";
import Image from "next/image";
import styles from "/styles/DisplayRobot.module.scss";
import RobotNotFound from "/components/OTHER/RobotNotFound/notFound";
import {useRouter} from "next/router";
import Calculator from "/components/CALCS/Calculator/Calculator.js";
import Loader from "/components/OTHER/Loader";
import PocketBase from "pocketbase";
import {getData, getValue, letsTryAgain} from "/pages/api/robots/[id]";
import Info from "/components/OTHER/Info";
import Head from "next/head";
import {AiFillStar} from "react-icons/ai";
import RoiCalculator from "/components/CALCS/RoiCalculator/RoiCalculator";
import Special from "/components/OTHER/SpecialRobot/Special";
import Ukranium from "/components/OTHER/SpecialRobot/Ukranium/ukranium";

const pb = new PocketBase('http://127.0.0.1:8090');

const initialRobot = {
    data: [],
    records: [],
    robot_json: [],
    robot_id: [],
};

const DisplayRobot = ({robotFull, value}) => {
    const router = useRouter();
    const {id} = router.query;
    const [favorite, setFavorite] = useState(false);
    //*everything from here down is favorites logic
    useEffect(() => {
        const div = document.getElementById("favorite_button");
        if (div === null) return;
        if (localStorage.getItem("favorites") === null) {
            localStorage.setItem("favorites", "");
            setFavorite(true);
        } else if (!localStorage.getItem("favorites").includes(id)) {
            setFavorite(true);
        } else if (localStorage.getItem("favorites") === null) {
            setFavorite(false);
        }
    }, [id]);
    useEffect(() => {
        const div = document.getElementById("favorite_button");
        if (div === null) return;
        if (!favorite) {
            if (localStorage.getItem("favorites") === null) {
                appendToStorage("favorites", robotFull.robot_id + ",");
                div.style.color = "#fde79e";
            } else if (localStorage.getItem("favorites").includes(id)) {
                div.style.color = "#fde79e";
            } else if (!localStorage.getItem("favorites").includes(id)) {
                appendToStorage("favorites", robotFull.robot_id + ",");
                div.style.color = "#fde79e";
            }

        } else {
            let old = localStorage.getItem("favorites");
            div.style.color = "white";
            if (old === null) old = "";
            old = old.replace(robotFull.robot_id + ",", "");
            localStorage.setItem("favorites", old);
        }
    }, [favorite, id, robotFull.robot_id]);
    const [returnValue, setReturn] = useState(0);
    //*to here

    if (value === 0) {
        return <RobotNotFound id={id}/>
    }
    if (value === 1) {
        return <Special id={id} robotFull={robotFull}/>
    }
    console.log(value)
    if (value === -1) {
        return <Ukranium />
    }
    const robot = robotFull.robot_json
    const traits = robot.attributes
    const freebet = traits[8].value
    const sportshares = traits[10].value
    const profitShare = value * sportshares

    if (!robotFull) {
        return <Loader/>
    }
    //! end error handling

    return (
        <div className={styles.page}>
            <div className={styles.robot_container}>
                <Head>
                    <title>{robot.name} || RollTrack</title>
                    <meta name="description" content={robot.description}/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                </Head>
                <div className={styles.robot_image_parent}>
                    <Image
                        className={styles.robot_image}
                        priority
                        src={robot.image}
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

            <div className={styles.lower_level_container}>

                <div className={styles.calculator_container}>
                    <Calculator value={profitShare} fullRobot={robotFull} setReturn={setReturn}/>
                </div>
                <div className={styles.roi_calc_container}>
                    <RoiCalculator returnValue={returnValue}/>
                </div>
                {/*<div className={styles.navigation_container}>*/}
                {/*    <Nav track={true} search={true} color={"#1F202A"}/>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};


export default DisplayRobot;

export const getServerSideProps = async (ctx) => {
    const id = ctx.query.id;
    console.log(id)
    if (parseInt(id) === 10001) {
        const robotFull = {
            data: [],
            records: [],
            robot_json: [],
            robot_id: 10001,
        }
        return {props: {robotFull, value: -1}}
    }
    else {
        const robotFull = await letsTryAgain(id)
            .then(async (data) => {
                return data;
            })
        if (robotFull.robot_json.attributes === undefined) return {props: {robotFull: initialRobot, value: 0}}
        const sport = robotFull.robot_json.attributes[2].value
        const value = await getValue(sport)

        if (value === "Special") {
            return {props: {robotFull: initialRobot, value: 1}}
        }
        return {
            props: {
                value,
                robotFull,
            },
        };
    }
};

export function appendToStorage(name, data) {
    let old = localStorage.getItem(name);
    if (old === null) old = "";
    localStorage.setItem(name, old + data);
}

function checkStorageId(id) {
    let old = localStorage.getItem("favorites");
    if (old === null) old = "";
    return old.includes(id);
}