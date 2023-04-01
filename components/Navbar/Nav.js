import styles from './nav.module.scss';
import {useRouter} from 'next/router';
import Link from 'next/link';

export default function Nav({search, track, color, chart}) {
    const router = useRouter();
    const {id} = router.query;
    return (
        <div className={styles.nav} style={{border: '3px solid', color}}>
            {search && (
                <Link href={`/`}>
                    <h1 className={styles.link}>Search</h1>
                </Link>
            )}
            {track && (
                <Link href={`/track/`}>
                    <h1 className={styles.link}>Tracker</h1>
                </Link>
            )}
            {chart && (
                <Link href={`/charts/`}>
                    <h1 className={styles.link}>Charts</h1>
                </Link>
            )}
        </div>
    )
}