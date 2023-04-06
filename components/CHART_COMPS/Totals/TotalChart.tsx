import React, {useEffect} from "react";
import styles from "./TotalChart.module.scss";
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
    return (
        <div className={styles.container}>
            <div className={styles.legend}>
                <h1>🤖: Sport</h1>
                <h1>💯: Total Amount of Bots</h1>
                <h1>🚗: Total Amount of Shares</h1>
                <h1>🚷: One Day Movement</h1>
                <h1>🏃: Seven Day Movement</h1>
                <h1>🌊: Total Individual Profitshare</h1>
                <h1>💰: Total Monthly Profitshare</h1>
            </div>
            <div className={styles.card_container}>
                {data.map((d) => (
                    <div className={styles.card} key={d[0]}>
                        <h1>🤖 {d[0]}</h1>
                        <h2>💯 {d[1].toFixed(2)}</h2>
                        <h2>🚗 {d[2].toFixed(2)}</h2>
                        <h2>🚶‍ {((d[4] / d[3]) * 100).toFixed(2)}%</h2>
                        <h2>🏃 {((d[5] / d[3]) * 100).toFixed(2)}%</h2>
                        <h2>🌊 ${d[3].toFixed(2)}</h2>
                        <h2>💰 ${(d[2] * d[3]).toFixed(2)}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}
