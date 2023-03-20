import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import {useRouter} from "next/router";
import {useRef, useState} from "react";
import Searchbar from "@/components/Searchbar/Searchbar";
import Affiliation from "@/components/Affiliation/Affiliation";
import Uses from "@/components/Uses/Uses";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>RollTrack.io</title>
        <meta name="description" content="RollTrack -- a NFT tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className={styles.main}>
          <div className={styles.search}>
            <Searchbar />
          </div>
          <div className={styles.affiliation}>
              <Affiliation />
          </div>
        </div>
    </>
  );
}
