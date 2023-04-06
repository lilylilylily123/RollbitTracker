import Link from "next/link";
import styles from './fullbar.module.scss';
import Searchbar from "/components/Searchbar/Searchbar";
export default function Navbar() {
    return(
        <div className={styles.topnav}>
            <Link href="/" className={styles.link}><img className={styles.icon} src={"/BallOnly.png"} height={40} width={70} alt={"Home"}/></Link>
            <Link href="/track" className={styles.link}>Tracking</Link>
            <Link href="/charts" className={styles.link}>Charts</Link>
            <Link href="/current" className={styles.link}>Current</Link>
            <span className={styles.searchbar}><Searchbar /></span>
        </div>

    )
}