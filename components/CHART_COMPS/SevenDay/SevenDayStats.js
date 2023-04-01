import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {Bar, Pie} from 'react-chartjs-2';
import {useEffect, useState} from "react";
import styles from "./sevenday.module.scss"


ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.color = 'white';
ChartJS.defaults.font = {
    family: 'Questrial, sans-serif',
    size: 18,
}

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Overall Seven Day Statistics',
        },
    },
};
const labels = ["Volume", "Change", "Sales", "Average Price"]


export default function SevenDayStats({SevenDayStats, ThirtyDayStats}) {
    console.log(SevenDayStats)

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Volume (7d vs 30d)',
                data: SevenDayStats,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 0.2)',

                ],
            },
            {
                label: 'Thirty Day Stats',
                data: ThirtyDayStats,
                backgroundColor: [
                    'rgba(54, 162, 235, 1)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 0.2)',
                ],
            }

        ]
    }
    return (
        <div className={styles.container}>
            <Bar className={styles.bar} data={data} options={options} />
        </div>
    );
}