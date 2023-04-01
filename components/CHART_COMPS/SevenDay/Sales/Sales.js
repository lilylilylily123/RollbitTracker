import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {Bar, Pie} from 'react-chartjs-2';
import {useEffect, useState} from "react";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styles from "./sales.module.scss"

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
            text: 'Sales',
        },
    },
};

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
export default function Sales({Seven, Thirty, One}) {
    const sales = [Seven, Thirty, One]
    const data = {
        labels: ["Sales"],
        datasets: [
            {
                label: 'Sales 1d',
                data: [sales[2]],
                backgroundColor: [
                    'rgba(255, 206, 86, 1)',
                ],
            },
            {
                datalabels: {
                    anchor: 'start',
                    align: 'start',
                },
                label: 'Sales 7d',
                data: [sales[0]],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                ],
            },
            {
                label: 'Sales 30d',
                data: [sales[1]],
                backgroundColor: [
                    'rgba(54, 162, 235, 1)',
                ],
            }
        ]}

    return (
        <div className={styles.container}>
            <Bar data={data} options={options}/>
        </div>
    )
}