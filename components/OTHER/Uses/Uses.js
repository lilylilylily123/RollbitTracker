import styles from "./styles.module.css";

export default function Uses() {
    return (
        <div className={styles.uses}>
            <div className={styles.uses_title}>
                Uses
            </div>
            <div className={styles.uses_body}>
                This site provides a couple of services. Our flagship feature is the calculator/stat checker, which lets you quickly<br></br>
                check the stats and ROI of any robot.
            </div>
        </div>
    );
}