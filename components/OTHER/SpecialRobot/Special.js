import Image from "next/image";
import Calculator from "@/components/CALCS/Calculator/Calculator";
import styles from "./special.module.scss"
import SpecialROI from "@/components/OTHER/SpecialRobot/SpecialROI/SpecialROI";
import {appendToStorage} from "@/pages/robots/[id]";
import {useEffect, useState} from "react";
import {AiFillStar} from "react-icons/ai";

export default function Special({id, robotFull}) {
    const [favorite, setFavorite] = useState(false);
    //!fav logic
    useEffect(() => {
        const div = document.getElementById("favorite_button");
        if (div === null) return;
        if (localStorage.getItem("favorites") === null) {
            localStorage.setItem("favorites", "");
            setFavorite(true);
        } else if (!localStorage.getItem("favorites").includes(id)) {
            setFavorite(true);
        } else if (localStorage.getItem("favorites") === null) {
            setFavorite(false);
        }
    }, [id]);
    useEffect(() => {
        const div = document.getElementById("favorite_button");
        if (div === null) return;
        if (!favorite) {
            if (localStorage.getItem("favorites") === null) {
                appendToStorage("favorites", robotFull.robot_id + ",");
                div.style.color = "#fde79e";
            } else if (localStorage.getItem("favorites").includes(id)) {
                div.style.color = "#fde79e";
            } else if (!localStorage.getItem("favorites").includes(id)) {
                appendToStorage("favorites", robotFull.robot_id + ",");
                div.style.color = "#fde79e";
            }

        } else {
            let old = localStorage.getItem("favorites");
            div.style.color = "white";
            if (old === null) old = "";
            old = old.replace(robotFull.robot_id + ",", "");
            localStorage.setItem("favorites", old);
        }
    }, [favorite, id, robotFull.robot_id]);
    const robot = robotFull.robot_json
    return (
        <>
        <div className={styles.container}>
            <div className={styles.image}>
                <Image className={styles.imgchild} src={robot.image} alt={robot.name} width={250} height={250}/>
            </div>
            <div id={"favorite_button"} className={styles.favorite_button} onClick={() => setFavorite(!favorite)}>
                <AiFillStar/>
            </div>
            <div className={styles.robotname}>
                <h1>{robot.name}</h1>
            </div>
            <div className={styles.stats}>
                <h1>Sportshares: {robot.attributes[3].value}</h1>
                <h1>Freebet: {robot.attributes[1].value}</h1>
            </div>
        </div>
        <SpecialROI fullRobot={robotFull}/>
        </>
    )
}