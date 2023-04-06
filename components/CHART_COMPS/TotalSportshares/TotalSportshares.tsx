import React, {useEffect} from 'react';
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import styles from './TotalSportshares.module.scss';
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(ChartDataLabels);


export default function TotalSportshares() {
    const [totalLabels, setTotalLabels] = React.useState<any>([]);
    const [datas, setDatas] = React.useState<any>([]);
    const [loading, setLoading] = React.useState(true);
    const dynamicColors = function() {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    };
    const color = []
    for (const i of totalLabels) {
        color.push(dynamicColors())
    }
    let data = {
        labels: totalLabels,
        datasets: [
            {
                label: 'Total Sportshares',
                data: datas,
                backgroundColor: color,
                borderColor: [
                    'rgb(0,0,0)',
                ],
                borderWidth: 2,
            },
        ],
    };

    useEffect(() => {
        setLoading(true)
        const fetchTotal = async () => {
            const response = await fetch('/api/total');
            return await response.json();
        };
        fetchTotal().then((r) => {
            const arr = r.thing;
            const labs = arr.map((a) => a[0]);
            setTotalLabels(labs);
            const shares =  arr.map((a) => (a[2] * a[3]).toFixed(2));
            setDatas(shares);
        });
        setLoading(false);
    }, []);

    return (
        <div className={styles.container}>
            <Doughnut className={styles.chart} width={400} height={400} options={{
                plugins: {
                    datalabels: {
                        display: false
                    }
                }
            }} data={data} />
        </div>
    );
}
