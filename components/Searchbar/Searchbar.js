import styles from "./styles.module.css";
import {useState} from "react";
import {useRouter} from "next/router";
import {FiSearch} from 'react-icons/fi'
export default function Searchbar() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isNaN(parseInt(search))) {
            alert("Please enter a number.");
            setSearch("")
            return;
        }
        router.push(`/robots/${search}`)
            .then(() => setSearch(""));
    }


    return (
        <form noValidate={true} className={styles.form}>
            <input className={styles.input} type="text" inputMode={"numeric"} pattern="\d*" value={search} onChange={(e) => setSearch(e.target.value)} required/>
            <button className={styles.fa} onClick={handleSubmit}><i ><FiSearch/></i></button>
        </form>
    )
};