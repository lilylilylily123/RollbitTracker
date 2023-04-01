import {useEffect, useState} from "react";
import styles from "./chart.module.scss"
import SevenDayStats from "@/components/CHART_COMPS/SevenDay/SevenDayStats";
import Volume from "@/components/CHART_COMPS/SevenDay/Volume/Volume";
import {Span} from "next/dist/server/lib/trace/tracer";
import Sales from "@/components/CHART_COMPS/SevenDay/Sales/Sales";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Nav from "@/components/Navbar/Nav";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);




const labels = ["Volume", "Change", "Sales", "Average Price"]
const data2 = {
    labels: labels,
    datasets: [
        {
            label: 'Volume (7d vs 30d)',
            data: [0, 0, 0, 0],
            backgroundColor: [

            ],
        }]
}

export default function Chart() {
    const [data, setData] = useState(data2)
    const [loading, setLoading] = useState(false)
    const [sevendaystats, setSevenDayStats] = useState([])
    const [thirtydaystats, setThirtyDayStats] = useState([])
    const [daystats, setDayStats] = useState([])

    useEffect(() => {
        setLoading(true)
        fetch(`https://api.opensea.io/api/v1/collection/sportsbots/stats`)
            .then(async (data) => {
                data = await data.json();
                const stats = data.stats
                const statsArray = Object.entries(stats)
                const sevendaystats = [statsArray[42][1].toFixed(3), statsArray[43][1].toFixed(3), statsArray[44][1].toFixed(3), statsArray[45][1].toFixed(3)]
                const thirtydaystats = [statsArray[47][1].toFixed(3), statsArray[48][1].toFixed(3), statsArray[49][1].toFixed(3), statsArray[50][1].toFixed(3)]
                const daystats = [statsArray[36][1].toFixed(3), statsArray[37][1].toFixed(3), statsArray[38][1].toFixed(3), statsArray[39][1].toFixed(3)]
                setSevenDayStats(sevendaystats)
                setThirtyDayStats(thirtydaystats)
                setDayStats(daystats)
                setData({
                    labels: labels,
                    datasets: [
                        {
                            label: data2.datasets[0].label,
                            backgroundColor: data2.datasets[0].backgroundColor,
                            data: statsArray,
                        }
                    ]
                })
                setLoading(false)
            })
    }, [])
    return (
        <div className={styles.containers}>
            <div className={styles.navigation}>
                <Nav track={true} color={"#262736"} search={true} chart={false}/>
            </div>
            <Volume SevenVolume={sevendaystats[0]} ThirtyVolume={thirtydaystats[0]} DayVolume={daystats[0]}/>
            <Sales Seven={sevendaystats[1]} Thirty={thirtydaystats[1]} One={daystats[1]}/>
        </div>
    )
}