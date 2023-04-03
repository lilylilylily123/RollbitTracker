import Head from "next/head";
import {Inter} from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Searchbar from "@/components/Searchbar/Searchbar";
import Affiliation from "@/components/OTHER/Affiliation/Affiliation";
import Image from "next/image";
import Nav from "@/components/Navbar/Nav";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import {renderToStaticMarkup} from "react-dom/server";


const ToolTipContent = (
    <div className={styles.tooltipcontent}>
        <h1>Thanks</h1>
        <p>
            This site will never be paywalled, and was made with the intention of giving back to the Rollbit Community.
            <br/>
            I would like to thank my amazing dev <code>goat#2017</code> for the hard work they put in to making this site a reality.
            <br/>
            If you are feeling generous, and would like to buy my next coffee or help recoup some of the site&apos;s dev costs & maintenance fees,
            <br/>
            please feel free to <code>/tip mmikebike09</code> and use the code <code>ROLLTRACK</code> while playing :)
        </p>
    </div>
)
const tooltipstatic = renderToStaticMarkup(ToolTipContent)

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
            <div data-tooltip-id={"tooltip"} data-tooltip-html={tooltipstatic} className={styles.promocode}>
                <h1>Code: <span>ROLLTRACK</span> & /tip mmikebike09</h1>
            </div>
            <Tooltip id={"tooltip"}
                     style={{backgroundColor: "#1F202A", color: "white", border: "none", borderRadius: "5px", padding: "20px", fontSize: "1.2rem", zIndex: 1}}
            />
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
