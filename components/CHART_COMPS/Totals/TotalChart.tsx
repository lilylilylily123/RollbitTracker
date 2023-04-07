import React, {useEffect} from "react";
import styles from "./TotalChart.module.scss";
import {color} from "chart.js/helpers";
type ChartRecord = {
    thing: {
        sport: string,
        amount: number,
        shares: number,
        sportsbook_profit: number,
        oneday_profit: number,
        sevenday_profit: number,
    }

}

export default function TotalChart() {
    const [data, setData] = React.useState<any>([])
    const [positive1, setPositive1] = React.useState<boolean>(false)
    useEffect(() => {
        const fetchTotal = async () => {
            const response = await fetch('/api/total')
            const data: ChartRecord = await response.json()
            return data
        }
        fetchTotal()
            .then((r) => {
                const arr = (r.thing)
                setData(arr)
            })

    }, [])
    // @ts-ignore
    // @ts-ignore
    return (
        <div className={styles.container}>
            <div className={styles.legend}>
                <ul className={styles.list}>
                    <h1 className={styles.one}>Sport</h1>
                    <h1 className={styles.two}>Total Amount of Bots</h1>
                    <h1 className={styles.three}>Total Amount of Shares</h1>
                    <h1 className={styles.four}>One Day Movement</h1>
                    <h1 className={styles.five}>Seven Day Movement</h1>
                    <h1 className={styles.six}>Total Individual Profitshare</h1>
                    <h1 className={styles.seven}>Total Monthly Profitshare</h1>
                </ul>
            </div>
            <div className={styles.card_container}>
                {data.map((d) => (
                    <div className={styles.card} key={d[0]}>
                        <ul className={styles.list}>
                            <h1 className={styles.one}>{d[0]}</h1>
                            <h2 className={styles.two} style={{color: parseFloat((100 - ((d[4] / d[3]) * 100)).toFixed(2)) >= 0 ? "green" : "red"}}>{parseFloat((100 - ((d[4] / d[3]) * 100)).toFixed(2))}%</h2>
                            <h2 className={styles.three} style={{color: parseFloat((100 - ((d[5] / d[3]) * 100)).toFixed(2)) >= 0 ? "green" : "red"}}>{parseFloat((100 - ((d[5] / d[3]) * 100)).toFixed(2))}%</h2>
                            <h2 className={styles.four}>{d[2].toFixed(2)}</h2>
                            <h2 className={styles.five}>{d[1].toFixed(2)}</h2>
                            <h2 className={styles.six}>${d[3].toFixed(2)}</h2>
                            <h2 className={styles.seven}>${(d[2] * d[3]).toFixed(2)}</h2>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}
