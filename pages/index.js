import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Searchbar from "@/components/Searchbar/Searchbar";
import Affiliation from "@/components/OTHER/Affiliation/Affiliation";
import Image from "next/image";
import Nav from "@/components/Navbar/Nav";
import 'react-tooltip/dist/react-tooltip.css'
import {Tooltip} from 'react-tooltip'

const tooltipContent = `
   
`


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
            <div data-tooltip-id={"tooltip"} data-tooltip-html={" <div style=\"\n        text-align: center;\n        background-color: #262736;\n        font-family: Questrial, sans-serif;\n        font-weight: 600;\n        z-index: 1;\n        padding: 1vw;\n        border-radius: 1vw;\n    \" >\n        <h1>Thanks!</h1>\n        <p>\n            This site will never be paywalled, and was made with the intention of giving back to the Rollbit Community.\n            <br/>\n            I would like to thank my amazing dev <code>goat#2017</code> for the hard work they put in to making this site a reality.\n            <br/>\n            If you are feeling generous, and would like to buy my next coffee or help recoup some of the site&apos;s dev costs & maintenance fees,\n            <br/>\n            please feel free to <code>/tip mmikebike09</code> and use the code <code>ROLLTRACK</code> while playing :)\n        </p>\n    </div>"} data-html={true} className={styles.promocode}>
                <h1>Code: <span>ROLLTRACK</span> & /tip mmikebike09</h1>
            </div>
            <Tooltip id={"tooltip"}
                     style={{backgroundColor: "#1F202A", color: "white", border: "none", borderRadius: "0.9vw", padding: "20px", fontSize: "1.2rem", zIndex: 1}}
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
