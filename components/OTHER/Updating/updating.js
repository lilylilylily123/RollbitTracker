import styles from './updating.module.scss';
import Image from 'next/image';

export default function Updating({fullRobot, sport}) {
    return (
        <div className={styles.container}>
            <h1>Updating! Please check back on the sport: {sport} later.</h1>
            <div className={styles.image_container}>
                <Image width={250} height={250} src={fullRobot.robot_json.image} alt={fullRobot.robot_json.name}/>
            </div>
        </div>
    )
}