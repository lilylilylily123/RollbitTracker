import DisplayRobot from "@/pages/robots/[id]";
import styles from "./track.module.scss";
import {getData} from "@/pages/api/robots/[id]";
import {TrackerChild} from "@/components/Tracker/tracker";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Loader from "@/components/Loader";
import Fav from "@/components/FavsNotFound/Fav";
function Tracker() {
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [robotList, setRobotList] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false)
        const robot = localStorage.getItem("favorites")
        if (robot === null) {
            setError(true);
        } else {
            const array = robot.split(',');
            const array2 = array.filter(function (el) {
                return el != null && el !== "" && el !== false;
            })
            setRobotList(array2)
            setLoaded(true);
        }
    }, [])
    if (error) {
        return <Fav />
    }

    if (!loaded) {
        return <div>Loading...</div>
    }
    return (
        <div className={styles.container}>
            <div className={styles.cards}>
                {robotList.map((id, index) => {
                    return <TrackerChild id={id} key={index}/>
                })}
            </div>
        </div>
    )
}

export default Tracker;