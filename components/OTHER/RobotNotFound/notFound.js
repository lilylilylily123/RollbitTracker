import styles from "./styles.module.scss";
import Link from "next/link";
export default function RobotNotFound({id}) {
    return (
    <div className={styles.container}>
        <div className={styles.text}>
            <h1>Uh oh! It looks like the robot with the ID of: {id} is unrevealed.</h1>
            <Link className={styles.link} href="/">Try searching for another one!</Link>
        </div>
    </div>
    )
}