import {useState} from "react";
import styles from "@/styles/Calculator.module.scss";

export default function OtherStats({robotFull}) {
    const sportsbot = robotFull.robot_json.sportsbot;
    const traits = robotFull.robot_json.data.traits;

    const profitShare = sportsbot.sportsbook_profit;
    const sportshares = traits[0].value;
    const freebet = traits[2].value;
    let robVal = profitShare.toFixed(2)


    const [loading, setLoading] = useState(true);
    const [bet, setBet] = useState(50);
    const [share, setShare] = useState(100);
    const [roi, setRoi] = useState(40);
    let uncheckedPrice = checkPrice(robVal, sportshares, share, freebet, bet, roi)
    const [price, setPrice] = useState(uncheckedPrice);

    return (
        <div className={styles.calculator_body}>
            <form className={styles.calculator_form}>
                <input value={bet} onChange={(e) => setBet(e.target.value)} type="number" placeholder="Bet %"/>
                <input value={share} onChange={(e) => setShare(e.target.value)} placeholder="Share %"/>
            </form>
            <div className={styles.calculator_results}>
                <h3>${checkYrVal(robVal, sportshares, share)} -- Yearly Share</h3>
                <h3>${checkFreebetYr(freebet, bet)} -- Yearly Freebet</h3>
                <h3>${checkTotal(robVal, sportshares, share, freebet, bet)} -- Yearly return</h3>
                {/*<h3>${checkPrice(robVal, sportshares, share, freebet, bet, roi)} -- Price</h3>*/}
                {/*<h3>{checkROI(robVal, sportshares, share, freebet, bet, price)}% -- ROI</h3>*/}
            </div>
        </div>
    )

}


function checkYrVal(val, amtShare, sharePerc) {
    let percentage = parseFloat(sharePerc);
    let perc = percentage / 100;
    let shareVal = val / amtShare;
    let yrShare = (shareVal * amtShare * 12) * (perc);
    return yrShare.toFixed(2);
}

function checkFreebetYr(freeBetVal, bet) {
    let percentage = parseFloat(bet);
    let perc = percentage / 100;
    let yrFree = (freeBetVal * 12) * (perc);
    return yrFree.toFixed(2);
}

function checkTotal(val, amtShare, sharePerc, freeBetVal, bet) {
    let yrShare = parseFloat(checkYrVal(val, amtShare, sharePerc));
    let yrFree = parseFloat(checkFreebetYr(freeBetVal, bet));
    let total = yrShare + yrFree;
    let totalFloat = parseFloat(total);
    return totalFloat.toFixed(2);
}

function checkPrice(val, amtShare, sharePerc, freeBetVal, bet, roiStat) {
    let yrShare = parseFloat(checkYrVal(val, amtShare, sharePerc));
    let yrFree = parseFloat(checkFreebetYr(freeBetVal, bet));
    let total = yrShare + yrFree;
    let totalFloat = parseFloat(total);
    let roiFloat = parseFloat(roiStat) / 100;
    let price = (totalFloat / roiFloat.toFixed(2));
    return price.toFixed(2);
}

function checkROI(val, amtShare, sharePerc, freeBetVal, bet, price) {
    let yrShare = parseFloat(checkYrVal(val, amtShare, sharePerc));
    let yrFree = parseFloat(checkFreebetYr(freeBetVal, bet));
    let total = yrShare + yrFree;
    let totalFloat = parseFloat(total);
    let priceFloat = parseFloat(price);
    let roi = (totalFloat / priceFloat) * 100;
    return roi.toFixed(2);
}