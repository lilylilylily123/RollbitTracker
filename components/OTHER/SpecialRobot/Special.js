import Image from "next/image";
import Calculator from "@/components/CALCS/Calculator/Calculator";
import styles from "./special.module.scss"
import SpecialROI from "@/components/OTHER/SpecialRobot/SpecialROI/SpecialROI";

export default function Special({id, robotFull}) {
    const robot = robotFull.robot_json
    return (
        <>
        <div className={styles.container}>
            <div className={styles.image}>
                <Image className={styles.imgchild} src={robot.image} alt={robot.name} width={250} height={250}/>
            </div>
            <div className={styles.robotname}>
                <h1>{robot.name}</h1>
            </div>
            <div className={styles.stats}>
                <h1>Sportshares: {robot.attributes[3].value}</h1>
                <h1>Freebet: {robot.attributes[1].value}</h1>
            </div>
        </div>
        <SpecialROI fullRobot={robotFull}/>
        </>
    )
}