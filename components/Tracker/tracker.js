import styles from "./styles.module.scss";
import {useEffect, useState} from "react";
import {getData} from "@/pages/api/robots/[id]";
import Image from "next/image";
import Info from "@/components/Info";
import Loader from "@/components/OtherLoader/OtherLoader";
import OtherLoader from "@/components/OtherLoader/OtherLoader";
import TrackNotFound from "@/components/TrackNotFound/TrackNotFound";
import Link from "next/link";

//! i use client side fetching here,
//! and retry in case of a ratelimit

export function TrackerChild({id, totals, setTotals}) {
    const [robotFull, setRobotFull] = useState({});
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(false);
        const robot = fetch(`/api/robots/${id}`)
            .then(async (data) => {
                data = await data.json();
                data = data.data
                setRobotFull(data);
                if (data.robot_json.sportsbot === undefined) {
                    await fetch (`/api/retry/${id}`)
                        .then(async (data) => {
                            data = await data.json();
                            data = data.data
                            setRobotFull(data);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                } else {
                    setTotals(previousState => ({
                        profitshare: [...previousState.profitshare, data.robot_json.sportsbot.sportsbook_profit],
                        freebet: [...previousState.freebet, data.robot_json.sportsbot.freebet_amount],
                        yrProfitshare: [...previousState.yrProfitshare, calculateYearlyShare(100, data.robot_json.sportsbot.sportshares, data.robot_json.sportsbot.sportsbook_profit)],
                        yrFreebet: [...previousState.yrFreebet, calculateYearlyFreebet(50, data.robot_json.sportsbot.freebet_amount)]
                    }) )
                }

                setLoaded(true);
            })
    }, [])

    if (!loaded) { return <OtherLoader /> }
    const robot = robotFull.robot_json.sportsbot;
    if (robot === undefined) {
        return <TrackNotFound id={id} />
    }
    const value = robot.sportsbook_profit;
    if (value === undefined) {
        return <TrackNotFound id={id} />
    }
    const sportshares = robot.sportshares;
    if (sportshares === undefined) {
        return <TrackNotFound id={id} />
    }
    let yearlyShare = calculateYearlyShare(100, sportshares, value);
    let yearlyFreebet = calculateYearlyFreebet(50, robot.freebet_amount);
    let totalReturn = (parseFloat(yearlyShare) + parseFloat(yearlyFreebet)).toFixed(2);

    return (
        <div className={styles.card}>
            <div className={styles.card_img}>
                <Image className={styles.robot_pfp} src={robot.image_full} alt={robot.name} width={150} height={150}/>
            </div>
            <div className={styles.card_header}>
                <h1>{robot.name}</h1>
                <Link className={styles.full_link} href={`/robots/${id}`}>Full Stats</Link>
            </div>
            <div className={styles.card_stats}>
                <h1>${calculateYearlyShare(100, sportshares, value)} -- Yearly Share</h1>
                <h1>${calculateYearlyFreebet(50, robot.freebet_amount)} -- Yearly Freebet</h1>
                <h1 className={styles.yr_return}>${totalReturn} -- Total Yearly Return</h1>
            </div>
        </div>
    );
}

function calculateYearlyShare(share, sportshares, value) {
    if (value === undefined) {
        return 0;
    }
    const perShare = value.toFixed(2) / sportshares;
    const sharePercentage = share / 100;
    return (perShare.toFixed(1) * sportshares * 12  * sharePercentage).toFixed(2);
}

function calculateYearlyFreebet(bet, freebet) {
    const betPercentage = bet / 100;
    return (freebet * 12 * betPercentage).toFixed(2);
}