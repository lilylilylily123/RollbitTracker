import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {Bar, Pie} from 'react-chartjs-2';
import {useEffect, useState} from "react";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styles from "./volume.module.scss"

ChartJS.register(ChartDataLabels);
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.color = 'white';
ChartJS.defaults.font = {
    family: 'Questrial, sans-serif',
    size: 18,
}
ChartJS.defaults.set('plugins.datalabels', {
    color: 'white',
    font: {
        family: 'Questrial, sans-serif',
        size: 25,
        weight: 'bold',
    },
    anchor: 'end',
    align: 'end',
});
export const options = {
    responsive: true,
    plugins: {
        legend: {
            labels: {
                padding: 10,
            },
            position: 'top',
        },
        title: {
            display: true,
            text: 'Volume',
        },
    },
};
export default function Volume({SevenVolume, ThirtyVolume, DayVolume}) {
    const volume = [SevenVolume, ThirtyVolume, DayVolume]
    const data = {
        labels: ["Volume"],
        datasets: [
            {
                datalabels: {
                    color: 'white',
                },
                label: 'Volume 1d',
                data: [volume[2]],
                backgroundColor: [
                    'rgba(255, 206, 86, 1)',
                ],
            },
            {
                label: 'Volume 7d',
                data: [volume[0]],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                ],
            },
            {
                label: 'Volume 30d',
                data: [volume[1]],
                backgroundColor: [
                    'rgba(54, 162, 235, 1)',
                ],
            }
        ]
    }
    return (
        <div className={styles.container}>
            <Bar data={data} options={options} />
        </div>
    )
}