import styles from './current.module.scss'
import TotalChart from "/components/CHART_COMPS/Totals/TotalChart";

export default function Current() {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h1>Current Stats</h1>
            </div>
            <div className={styles.chart_container}>
                <TotalChart />
            </div>
        </div>
    )
}