import styles from "./perskin.module.scss"
import React, {useEffect} from 'react';
import PerskinChart from "/components/CHART_COMPS/PerSkin/perskinChart";





export default function PerSkin() {
    const [labels, setLabels] = React.useState([]);
    const [datas, setData] = React.useState([]);
    const [option, setOption] = React.useState("Basketball");
    const [loading, setLoading] = React.useState(false);
    const [mult, setMulti] = React.useState(1);

    useEffect(() => {
        fetch('/api/total')
            .then((res) => res.json())
            .then((data) => {
                const r = data.uniqueArray;
                for (let i = 0; i < r.length; i++) {
                    setLabels((prev) => [...prev, r[i][0]]);
                }
                setData(r);
                setLoading(true);
            }
        );
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.select_container}>
                <select className={styles.select} onChange={(e) => setOption(e.target.value)}>
                    {labels.map((label) => (
                            <option key={label}>{label}</option>
                    ))}
                </select>
                <select className={styles.select} onChange={(e) => setMulti(parseInt(e.target.value))}>
                    <option value={1}>Steel Skin</option>
                    <option value={2}>Flame Ceramic</option>
                    <option value={3}>Electric Space</option>
                    <option value={4}>Lava</option>
                    <option value={5}>Aqua</option>
                    <option value={10}>Gold</option>
                </select>
            </div>
            <div className={styles.chart_container}>
                {loading ? <PerskinChart mult={mult} option={option} datas={datas} /> :<></>}
            </div>
        </div>
    )
}