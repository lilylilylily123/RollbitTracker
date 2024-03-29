import styles from "./track.module.scss";
import {TrackerChild} from "/components/CALCS/Tracker/tracker";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Loader from "/components/OTHER/Loader";
import Fav from "/components/FavsNotFound/Fav";
import Totals from "/components/CALCS/Totals/Totals";
function Tracker() {
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [robotList, setRobotList] = useState([]);
    const [error, setError] = useState(false);

    const [totals, setTotals] = useState({
        freebet: [],
        profitshare: [],
        yrFreebet: [],
        yrProfitshare: []
    })
    //* more session storage logic
    useEffect(() => {
        setError(false);
        const robot = localStorage.getItem("favorites")
        if (robot === null || robot === "" || robot === "null") {
            setError(true);
        } else {
            const array = robot.split(',');
            const array2 = array.filter(function (el, pos, self) {
                return el != null && el !== "" && el !== false && self.indexOf(el) === pos;
            })
            setRobotList(array2)
            setLoaded(true);
        }
    }, [])
    if (error) {
        return <Fav />
    }


    if (!loaded) {
        return <Loader />
    }
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.total}>
                    <Totals totals={totals}/>
                </div>

            </div>
            <div className={styles.cards}>
                {robotList.map((id, index) => {
                    return <TrackerChild id={id} key={index} totals={totals} setTotals={setTotals}/>
                })}
            </div>
        </div>
    )
}

export default Tracker;