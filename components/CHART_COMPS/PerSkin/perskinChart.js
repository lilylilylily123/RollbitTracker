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




export default function PerskinChart({datas, option, mult}) {
    const fullData = datas.find((data) => data[0] === option)
    const [label1, setLabel1] = React.useState([]);
    const [data2, setData2] = React.useState([]);
    useEffect(() => {
        fetch(`/api/${option}`)
            .then(async (data) => {
                const r = await data.json();
                console.log(r)
                setData2(Object.values(r.data).map((data) => data * mult));
                setLabel1(Object.keys(r.data));
            })
    }, [mult, option]);
    const dat = data2.map((data) => data.toFixed(2));
    const data = {
        labels: label1,
        datasets: [
            // {
            //     label: 'Daily',
            //     data: [data1.toFixed(2)],
            //     borderColor: 'rgb(255, 99, 132)',
            //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
            // },
            {
                label: 'Historical',
                data: dat,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            }
        ],
    };
    return (
        <div className={styles.container}>
            <div className={styles.chart_container}>
                <Line options={options} data={data} />;
            </div>
        </div>
    )
}