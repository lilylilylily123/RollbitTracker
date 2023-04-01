import styles from "./styles.module.scss";
import {useEffect, useState} from "react";
import {getData, getValue, letsTryAgain} from "@/pages/api/robots/[id]";
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
    const [value, setValue] = useState(0);
    useEffect(() => {
        setLoaded(false);
        const bobot = letsTryAgain(id)
            .then(async (data) => {
                const val = getValue(data.robot_json.attributes[2].value)
                    .then((value) => {
                        return value;
                    })
                const value = await val;
                setValue(value);
                setRobotFull(data);
                setTotals(previousState => ({
                    profitshare: [...previousState.profitshare, value],
                    freebet: [...previousState.freebet, data.robot_json.attributes[8].value],
                    yrProfitshare: [...previousState.yrProfitshare, calculateYearlyShare(100, value, value)],
                    yrFreebet: [...previousState.yrFreebet, calculateYearlyFreebet(50, data.robot_json.attributes[8].value)]
                }))
                setLoaded(true);
            })
    }, [id, setTotals])

    if (!loaded) { return <OtherLoader /> }
    const robot = robotFull.robot_json;
    if (robot === undefined) {
        return <TrackNotFound id={id} />
    }
    const sportshares = robot.attributes[10].value;
    if (sportshares === undefined) {
        return <TrackNotFound id={id} />
    }
    let yearlyShare = calculateYearlyShare(100, sportshares, value);
    console.log(yearlyShare)
    let yearlyFreebet = calculateYearlyFreebet(50, parseInt(robot.attributes[8].value));
    let totalReturn = (parseFloat(yearlyShare) + parseFloat(yearlyFreebet)).toFixed(2);

    return (
        <div className={styles.card}>
            <div className={styles.card_img}>
                <Image className={styles.robot_pfp} src={robot.image} alt={robot.name} width={150} height={150}/>
            </div>
            <div className={styles.card_header}>
                <h1>{robot.name}</h1>
                <Link className={styles.full_link} href={`/robots/${id}`}>Full Stats</Link>
            </div>
            <div className={styles.card_stats}>
                <h1>${calculateYearlyShare(100, sportshares, value)} -- Yearly Share</h1>
                <h1>${calculateYearlyFreebet(50, robot.attributes[8].value)} -- Yearly Freebet</h1>
                <h1 className={styles.yr_return}>${totalReturn} -- Total Yearly Return</h1>
            </div>
        </div>
    );
}

function calculateYearlyShare(share, sportshares, value) {
    if (value === undefined) {
        return 0;
    }
    const perShare = parseInt(value).toFixed(2) / sportshares;
    const sharePercentage = share / 100;
    return (perShare.toFixed(1) * sportshares * 12  * sharePercentage).toFixed(2);
}

function calculateYearlyFreebet(bet, freebet) {
    const betPercentage = bet / 100;
    return (freebet * 12 * betPercentage).toFixed(2);
}