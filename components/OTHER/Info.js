import React, {useEffect, useState} from "react";
import styles from "/styles/DisplayRobot.module.scss";

const Info = ({trait}) => {
    const [x, setX] = useState([]);
    useEffect(() => {
        const x = trait.filter((trait) => typeof trait.value !== "number");
        setX(x);
    }, []);


    return (
        <div className={styles.robot_info}>
            {x &&
                x.map((trait, i) => (
                    <div key={i} className={styles.robot_alltraits}>
                        <h3 className={styles.robot_trait}>{trait.trait_type}</h3>
                        <p className={styles.robot_value}>{trait.value}</p>
                    </div>
                ))}
        </div>
    );
}

export default Info;