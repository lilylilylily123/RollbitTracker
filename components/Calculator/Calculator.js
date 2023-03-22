import styles from "./styles.module.scss";
import {useState} from "react";

export default function Calculator({fullRobot, setReturn}) {
    const [share, setShare] = useState(100);
    const [bet, setBet] = useState(50);
    const sports = fullRobot.robot_json.sportsbot;
    const traits = fullRobot.robot_json.data.traits;
    const value = sports.sportsbook_profit;
    const sportshares = sports.sportshares;
    const freebet = sports.freebet_amount;
    let yearlyShare = calculateYearlyShare(share, sportshares, value);
    let yearlyFreebet = calculateYearlyFreebet(bet, freebet);
    let totalReturn = (parseFloat(yearlyShare) + parseFloat(yearlyFreebet)).toFixed(2);

    return (
        <div className={styles.calculator}>
            <div className={styles.label_container}>
                <div className={styles.profitshare_label}>
                    <h3>Profit Share</h3>
                    <h3>Yearly Profit Share</h3>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.robot_inputs}>
                    {/*<label htmlFor={"share"}>Profit Share</label>*/}
                    <input className={styles.input} id={"share"} value={share} onChange={(e) => setShare(e.target.value)} type="text" placeholder="Enter your share amount" />
                    <input className={styles.input} id={"bet"} value={bet} onChange={(e) => setBet(e.target.value)} type="text" placeholder="Enter your bet amount" />
                </div>
                <div className={styles.total_container}>
                    <h1>Total Yearly Return</h1>
                    <h3 className={styles.total_return} onChange={setReturn(totalReturn)}>${totalReturn}</h3>
                </div>
                <div className={styles.robot_results}>
                    <h3 id={"share"}>${yearlyShare}</h3>
                    <h3 id={"bet"}>${yearlyFreebet}</h3>
                </div>
            </div>
            <div className={styles.freebet_label}>
                <h3>Freebet</h3>
                <h3>Yearly Freebet</h3>
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