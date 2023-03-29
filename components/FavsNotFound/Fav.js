import styles from "./Fav.module.scss";
import Link from "next/link";

export default function Fav() {
    return (
        <div className={styles.container}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <h1>You haven't added any favorites yet!</h1>
            <h2>Add a favorite by clicking the star icon on any <Link className={styles.link} href={"/"}>robot's page<span className={styles.period}>.</span></Link></h2>
        </div>
    )
}