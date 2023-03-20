import styles from "./styles.module.css";
import {useState} from "react";
import {useRouter} from "next/router";

export default function Searchbar() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`/robots/${search}`);
    }


    return (
        <form className={styles.form}>
            <input className={styles.input} type="search" value={search} onChange={(e) => setSearch(e.target.value)} required typeof={"numeric"}/>
                <i className={"fa"}></i>
            <button className={styles.button} onClick={handleSubmit}>Search</button>
        </form>
    )
};