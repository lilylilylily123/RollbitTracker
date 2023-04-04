import styles from "./specialroi.module.scss";
import RoiCalculator from "@/components/CALCS/RoiCalculator/RoiCalculator";
import {calculateYearlyFreebet, calculateYearlyShare} from "@/components/CALCS/Calculator/Calculator";
import {getValue} from "@/pages/api/robots/[id]";
import {useState} from "react";

export default function SpecialROI({fullRobot}) {
    const [value, setValue] = useState(0)
    const values = getValue(fullRobot.robot_json.attributes[0].value)
        .then((value) => {
            setValue(value)
        })
    const yearlyShare = calculateYearlyShare(100, parseFloat(fullRobot.robot_json.attributes[3].value), parseFloat(value))
    const yearlyFreebet = calculateYearlyFreebet(50, parseFloat(fullRobot.robot_json.attributes[1].value))
    const returnValue = (parseFloat(yearlyShare) + parseFloat(yearlyFreebet)).toFixed(2);
    return (
        <div className={styles.container}>
            <div className={styles.text}>
                <h1>Special Robot ROI Calculator</h1>
                <h2>WARNING: this information may not be entirely accurate, as special robots are quite odd.</h2>
            </div>
            <RoiCalculator returnValue={returnValue} />
        </div>
    )
}