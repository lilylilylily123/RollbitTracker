import styles from './loader.module.scss';

export default function OtherLoader() {
    return (
        <div className={styles.loader_container}>
            <span className={styles.loader}></span>
        </div>
    )
}