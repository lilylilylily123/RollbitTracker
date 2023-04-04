import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Searchbar from "@/components/Searchbar/Searchbar";
import Affiliation from "@/components/OTHER/Affiliation/Affiliation";
import Image from "next/image";
import Nav from "@/components/Navbar/Nav";
import {Tooltip} from "react-tooltip";
import {renderToStaticMarkup} from "react-dom/server";
import 'react-tooltip/dist/react-tooltip.css';

const tooltip = (
<div className={styles.tooltipcontent}>
    <h1>Thanks</h1>
    <p>
    This project will NEVER be paywalled. It was made with the sole intention of giving back to the Rollbit community. <br/>
    If you would like to support the project, please use the code <code>ROLLTRACK</code> and <code>/tip mmikebike09</code>. <br/>
    I&apos;d also like to thank my dev <code>goat</code> for all their amazing work on this project. <br/>
    </p>
</div>
)
const tooltip2 = renderToStaticMarkup(tooltip)

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

            <div data-tooltip-html={tooltip2} data-tooltip-delay-hide={2000} data-tooltip-offset={20} data-tooltip-id={"promo"} className={styles.promocode}>
                <h1>Code: <span>ROLLTRACK</span> & /tip mmikebike09</h1>
            </div>
            <Tooltip id={"promo"} style={
                {backgroundColor: "#1F202A", color: "white", border: "none", borderRadius: "18px", padding: "10px"}
            } />
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
