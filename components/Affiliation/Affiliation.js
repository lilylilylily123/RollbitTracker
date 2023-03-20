import styles from "./styles.module.css";

export default function Affiliation() {
    return (
        <div className={styles.affiliation}>
            <div className={styles.affiliation_title}>
                Affiliation
            </div>
            <div className={styles.affiliation_body}>
                This site is not affiliated with "rollbit.com", "rollbot.com", or any other sites.
            </div>
        </div>
    );
}