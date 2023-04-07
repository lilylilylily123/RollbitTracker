import React, {useEffect} from 'react';
import styles from "./historicaltotalchart.module.scss"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar, Line} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        datalabels: {
            display: false,
            // anchor: 'center',
            // align: 'center',
        },
        legend: {
            position: 'right',
        },
    },
};


export default function HistoricalTotalChart() {
    const [labels, setLabels] = React.useState([]);
    const [datas, setData] = React.useState([]);
    useEffect(() => {
        fetch('/api/fetchhistory')
            .then((res) => res.json())
            .then((data) => {
                const r = data.record[0].historical;
                setLabels(Object.keys(r));
                setData(Object.values(r));
            }
        );
    }, []);
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Total Sportshares',
                data: datas,
                fill: true,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    }

    return (
        <div className={styles.container}>
            <Line className={styles.chart} data={data} options={options} />
        </div>
    )
}