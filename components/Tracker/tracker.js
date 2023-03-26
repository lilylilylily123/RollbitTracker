import styles from "./styles.module.scss";
import {useEffect, useState} from "react";
import {getData} from "@/pages/api/robots/[id]";
import Image from "next/image";
import Info from "@/components/Info";

export function TrackerChild({id}) {
    const [robotFull, setRobotFull] = useState({});
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(false);
        const robot = getData(id)
            .then(async (data) => {
                setRobotFull(data);
                setLoaded(true);
            })
    }, [])

    if (!loaded) { return <div>Loading...</div> }
    const robot = robotFull.robot_json.sportsbot;
    const value = robot.sportsbook_profit;
    const sportshares = robot.sportshares;
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
            </div>
            <div className={styles.card_stats}>
                <h1>${calculateYearlyShare(100, sportshares, value)} -- Yearly Share</h1>
                <h1>${calculateYearlyFreebet(100, robot.freebet_amount)} -- Yearly Freebet</h1>
                <h1 className={styles.yr_return}>${totalReturn} -- Total Yearly Return</h1>
            </div>
        </div>
    );
}

function calculateYearlyShare(share, sportshares, value) {
    const perShare = value.toFixed(2) / sportshares;
    const sharePercentage = share / 100;
    return (perShare.toFixed(1) * sportshares * 12  * sharePercentage).toFixed(2);
}

function calculateYearlyFreebet(bet, freebet) {
    const betPercentage = bet / 100;
    return (freebet * 12 * betPercentage).toFixed(2);
}