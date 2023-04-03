import styles from './trackNF.module.scss';
import {useRouter} from "next/router";

export default function TrackNotFound({id}) {
    const router = useRouter();
    const handleClick = () => {
        let old = sessionStorage.getItem("favorites");
        if (old === null) old = "";
        old = old.replaceAll(id + ",", "");
        sessionStorage.setItem("favorites", old);
        router.reload();
    }

    return (
        <div className={styles.container}>
            <h1>Uh oh! It looks like the robot with the ID of {id} is unrevealed!</h1>
            <h2>Therefore, this robot is untrackable.</h2>
            <h2 className={styles.remove} onClick={handleClick}>Click me to remove Sportsbot #{id} as a favorite.</h2>
        </div>
    )
}