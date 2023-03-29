import styles from './Totals.module.scss';
import {useEffect, useState} from "react";
import Loader from "@/components/Loader";

export default function Totals({totals}) {
    const [loading, setLoading] = useState(false);

    const [freebet, setFreebet] = useState(0);
    const [profitshare, setProfitshare] = useState(0);
    const [yrProfitshare, setYrProfitshare] = useState(0);
    const [yrFreebet, setYrFreebet] = useState(0);

    useEffect(() => {
        setLoading(true);
        const freebetUnadded = totals.freebet;
        const freb = freebetUnadded.filter((el) => {
            return el !== undefined;
        });
        let count=0;
        for (let i=freb.length; i--;) {
            count+=freb[i];
        }
        setFreebet(count)
        setLoading(false)
    }, [totals.freebet])

    useEffect(() => {
        setLoading(true);
        const profitshareUnadded = totals.profitshare;
        const preb = profitshareUnadded.filter((el) => {
            return el !== undefined;
        });
        let count=0;
        for (let i=preb.length; i--;) {
            count+=preb[i];
        }
        setProfitshare(count)
        setLoading(false)
    }, [totals.profitshare])
    useEffect(() => {
        setLoading(true);
        const yrProfitshareUnadded = totals.yrProfitshare;
        const yPreb = yrProfitshareUnadded.filter((el) => {
            return el !== undefined;
        });
        let count=0;
        for (let i=yPreb.length; i--;) {
            count+=parseFloat(yPreb[i]);
        }
        setYrProfitshare(count)
        setLoading(false)
    }, [totals.yrProfitshare])
    useEffect(() => {
        setLoading(true);
        const yrFreebetUnadded = totals.yrFreebet;
        const yFreb = yrFreebetUnadded.filter((el) => {
            return el !== undefined;
        });
        let count=0;
        for (let i=yFreb.length; i--;) {
            count+=parseFloat(yFreb[i]);
        }
        console.log(totals.yrFreebet)
        setYrFreebet(count)
        setLoading(false)
    }, [totals.yrFreebet])

    if (loading) {
        return <Loader/>;
    }
    return (
        <div className={styles.totals}>
            <div className={styles.freebet}>
                <h1>Total Freebet: ${freebet}</h1>
                <h1>Total Yearly Freebet: ${yrFreebet}</h1>
                <h1>Total Monthly Freebet: ${(yrFreebet / 12).toFixed(2)}</h1>
            </div>
            <div className={styles.profitshare}>
                <h1>Total Profitshare: ${profitshare.toFixed(2)}</h1>
                <h1>Total Yearly Profitshare: ${yrProfitshare.toFixed(2)}</h1>
                <h1>Total Monthly Profitshare: ${(yrProfitshare / 12).toFixed(2)}</h1>
            </div>
        </div>
    );
}
