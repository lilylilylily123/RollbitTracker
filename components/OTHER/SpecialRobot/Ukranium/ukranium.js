import styles from './ukranium.module.scss'
import Image from "next/image";

export default function Ukranium() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Ukranium</h1>
                <Image src={"https://i.seadn.io/gcs/files/cb3807d4c900074b50abc1ecae3547b0.webp?auto=format&w=1000"} alt={"Ukranium"} width={350} height={350}/>
            </div>
            <div className={styles.body}>
               <p>
                   This 1/1 Special Sports Rollbot will be auctioned on OpenSea. 100% of the proceeds will go to Ukraine&apos;s official ETH donation address. This Sports Rollbot will have maximum utility benefits on Rollbot.com / Rollbit.com. This Rollbot will be part of the 10,000 Sports Rollbots collection.
                   The winner will be airdropped 10 Sports Rollbots, 10 V1 Rollbots, and 10,000,000 RLB.
                   Rollbit will endeavour to add extra benefits for the winner, which won&apos;t be available to other Rollbot holders.
                   #PrayForUkraine
               </p>
                <a className={styles.link} href={"https://opensea.io/assets/ethereum/0x1de7abda2d73a01aa8dca505bdcb773841211daf/380"}>Full Link</a>
            </div>
        </div>
    )
}