import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Searchbar from "@/components/Searchbar/Searchbar";
import Affiliation from "@/components/OTHER/Affiliation/Affiliation";
import Image from "next/image";
import Nav from "@/components/Navbar/Nav";
// import 'react-tooltip/dist/react-tooltip.css'
// import {Tooltip} from 'react-tooltip'


export default function Home() {
  return (
    <>
      <Head>
        <title>RollTrack.io</title>
        <meta name="description" content="RollTrack -- a NFT tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>

        <div className={styles.main}>
            <div className={styles.image}>
                <Image className={styles.rotater} draggable={"false"} src="/BallOnly.png" width={250} height={150} alt="RollTrack" />
                <Image draggable={"false"} src={"/RollTrackText.png"} width={250} height={40} alt="RollTrack" />
            </div>
          <div className={styles.search}>
            <Searchbar />
          </div>
            <div data-tooltip-id={"tooltip"} data-tooltip-html={""} data-html={true} className={styles.promocode}>
                <h1>Code: <span>ROLLTRACK</span> & /tip mmikebike09</h1>
            </div>
            {/*<Tooltip id={"tooltip"}*/}
            {/*         style={{backgroundColor: "#1F202A", color: "white", border: "none", borderRadius: "0.9vw", padding: "20px", fontSize: "1.2rem", zIndex: 1}}*/}
            {/*/>*/}
          <div className={styles.affiliation}>
              <Affiliation />
          </div>
            <div className={styles.navigation}>
                <Nav chart={true} track={true} color={"#3B3E50"}/>
            </div>
        </div>

    </>
  );
}
