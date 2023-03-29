import styles from "./styles.module.scss";
import {useEffect, useState} from "react";

export default function RoiCalculator({fullRobot, returnValue}) {
    const [roi, setRoi] = useState(40.00);
    let ogPrice = returnValue/(roi/100)
    const [price, setPrice] = useState(ogPrice.toFixed(2));
    const [returnPrice, setReturnPrice] = useState(returnValue);
    const [displayRoi, setDisplayRoi] = useState(roi);
    const [displayPrice, setDisplayPrice] = useState(price);
    useEffect(() => {
        setDisplayRoi((parseFloat(returnPrice)/parseFloat(price)*100).toFixed(2))
    }, [price])
    useEffect(() => {
        setDisplayPrice((parseFloat(returnPrice)/parseFloat(roi)*100).toFixed(2))
    }, [roi])
    useEffect(() => {
        setPrice((parseFloat(returnPrice)/parseFloat(roi)*100).toFixed(2))
    }, [displayPrice])
    useEffect(() => {
        setDisplayPrice((parseFloat(returnPrice)/parseFloat(roi)*100).toFixed(2))
        setDisplayRoi((parseFloat(returnPrice)/parseFloat(price)*100).toFixed(2))
    }, [returnPrice])
    useEffect(() => {
        setReturnPrice(returnValue)
    }, [returnValue])

    return (
        <div className={styles.roi_container}>
                <h1>ROI Calculator</h1>
                <div className={styles.roi_inputs}>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Enter your price" />
                    <input value={returnPrice} onChange={(e) => setReturnPrice(e.target.value)} type="text" placeholder="Enter your return" />
                    <input value={roi} onChange={(e) => setRoi(e.target.value)} type="text" placeholder="Enter your ROI" />
                </div>
                <div className={styles.roi_results}>
                    <h3>Price: <br />${displayPrice}</h3>
                    <h3>Return: <br />${returnPrice}</h3>
                    <h3>ROI: <br />{displayRoi}%</h3>
                </div>
        </div>
    )
}

