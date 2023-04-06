import styles from "./styles.module.scss";
import {useEffect, useState} from "react";
import {getData, getValue, letsTryAgain} from "/pages/api/robots/[id]";
import Image from "next/image";
import OtherLoader from "/components/OTHER/OtherLoader/OtherLoader";
import TrackNotFound from "/components/OTHER/TrackNotFound/TrackNotFound";
import Link from "next/link";

//! i use client side fetching here,
//! and retry in case of a ratelimit

export function TrackerChild({id, totals, setTotals}) {
    const [robotFull, setRobotFull] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [value, setValue] = useState(0);
    const [special, setSpecial] = useState(false);
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
                if (value === 1) {
                    setSpecial(true);
                    const val2 = getValue(data.robot_json.attributes[0].value)
                        .then((value) => {
                            setTotals(previousState => ({
                                profitshare: [...previousState.profitshare, value],
                                freebet: [...previousState.freebet, data.robot_json.attributes[1].value],
                                yrProfitshare: [...previousState.yrProfitshare, value * 12],
                                yrFreebet: [...previousState.yrFreebet, calculateYearlySpecialBet(data.robot_json.attributes[1].value)]
                            }))
                            return value;
                        })
                    setValue(await val2);
                    setRobotFull(data);

                    setLoaded(true);
                } else {
                    setRobotFull(data);
                    setTotals(previousState => ({
                        profitshare: [...previousState.profitshare, value],
                        freebet: [...previousState.freebet, data.robot_json.attributes[8].value],
                        yrProfitshare: [...previousState.yrProfitshare, calculateYearlyShare(100, data.robot_json.attributes[10].value, value)],
                        yrFreebet: [...previousState.yrFreebet, calculateYearlyFreebet(50, data.robot_json.attributes[8].value)]
                    }))
                    setLoaded(true);
                }
            })
    }, [id, setTotals])

    if (!loaded) { return <OtherLoader /> }
    const robot = robotFull.robot_json;
    if (robot === undefined) {
        return <TrackNotFound id={id} />
    }
    let sportshares = robot.attributes[10]?.value;
    if (special) {
        sportshares = robot.attributes[3].value;
    }

    if (sportshares === undefined) {
        return <TrackNotFound id={id} />
    }

    let yearlyShare = calculateYearlyShare(100, sportshares, value);
    let yearlyFreebet = calculateYearlyFreebet(50, parseInt(robot.attributes[8]?.value));
    let totalReturn = (parseFloat(yearlyShare) + parseFloat(yearlyFreebet)).toFixed(2);

    if (special) {
        const returns = 12 * ((robot.attributes[1].value * 2/3) + value);
        yearlyShare = 12 * value;
        yearlyFreebet = 12 * (robot.attributes[1].value * 2/3);
        totalReturn = returns.toFixed(2);
    }

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
                <h1>${parseFloat(yearlyShare).toFixed(2)} -- Yearly Share</h1>
                <h1>${parseFloat(yearlyFreebet).toFixed(2)} -- Yearly Freebet</h1>
                <h1 className={styles.yr_return}>${totalReturn} -- Total Yearly Return</h1>
            </div>
        </div>
    );
}

function calculateYearlyShare(share, sportshares, value) {
    const value2 = value * sportshares;
    const perShare = value2.toFixed(2) / sportshares;
    const sharePercentage = share / 100;
    return (perShare.toFixed(1) * sportshares * 12  * sharePercentage).toFixed(2);
}

function calculateYearlyFreebet(bet, freebet) {
    const betPercentage = bet / 100;
    return (freebet * 12 * betPercentage).toFixed(2);
}

function calculateYearlySpecialBet(freebet) {
    return 12 * (freebet * (2/3))
}