import styles from "./perskin.module.scss"
import React, {useEffect} from 'react';
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
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        datalabels: {
            anchor: 'center',
            align: 'center',
        },
        legend: {
            position: 'right',
        },
    },
};




export default function PerskinChart({datas, option, mult}) {
    const fullData = datas.find((data) => data[0] === option)
    const label1 = fullData[0]
    const data1 = fullData[3] * mult
    const data2 = fullData[5] * mult
    const data = {
        labels: [label1],
        datasets: [
            {
                label: 'Daily',
                data: [data1.toFixed(2)],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Weekly',
                data: [data2.toFixed(2)],
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            }
        ],
    };
    return (
        <div className={styles.container}>
            <div className={styles.chart_container}>
                <Bar options={options} data={data} />;
            </div>
        </div>
    )
}