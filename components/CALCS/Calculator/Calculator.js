import styles from "./styles.module.scss";
import {useState} from "react";
import Searchbar from "@/components/Searchbar/Searchbar";

export default function Calculator({fullRobot, setReturn, value}) {
    const [share, setShare] = useState(100);
    const [bet, setBet] = useState(50);
    const sportshares = fullRobot.robot_json.attributes[10].value;
    const freebet = fullRobot.robot_json.attributes[8].value;
    let yearlyShare = calculateYearlyShare(share, sportshares, value);
    let yearlyFreebet = calculateYearlyFreebet(bet, freebet);
    let totalReturn = (parseFloat(yearlyShare) + parseFloat(yearlyFreebet)).toFixed(2);

    return (
        <div className={styles.calculator}>
            <div className={styles.container}>

                <div className={styles.robot_results}>
                    <h3 id={"share"}>${yearlyShare} <br/> <span className={styles.labelz}>Yearly Profit Share</span></h3>
                    <h3 id={"bet"}>${yearlyFreebet} <br/> <span className={styles.labelz}>Yearly Freebet</span></h3>
                </div>
                <div className={styles.total_container}>
                    <h1>Total Yearly Return</h1>
                    <h3 className={styles.total_return} onChange={setReturn(totalReturn)}>${totalReturn}</h3>
                </div>
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