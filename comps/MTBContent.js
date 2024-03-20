import React from 'react'
import styles from '../styles/Home.module.css';
import { FaBullseye } from "react-icons/fa";
function MTBContent({title}) {
    return (
        <div className={styles.discoverMTBContent}>
            <h3>Discover The Collections</h3>
            <h1>{title}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus.</p>
            <button className={styles.exploreBtnOne}>Explore Now</button>
            <div className={styles.discoverMTBList}>
                <div className={styles.discoverMTBListContent}>
                    <span><FaBullseye style={{ marginRight: 10, color: "rgb(224, 0, 0)" }} />Officia deserunt mollit</span>
                    <span><FaBullseye style={{ marginRight: 10, color: "rgb(224, 0, 0)" }} />Excepteur sint occaecat</span>
                    <span><FaBullseye style={{ marginRight: 10, color: "rgb(224, 0, 0)" }} />Sunt in culpa qui</span>
                </div>
                <div className={styles.discoverMTBListContent}>
                    <span><FaBullseye style={{ marginRight: 10, color: "rgb(224, 0, 0)" }} />Officia deserunt mollit</span>
                    <span><FaBullseye style={{ marginRight: 10, color: "rgb(224, 0, 0)" }} />Excepteur sint occaecat</span>
                    <span><FaBullseye style={{ marginRight: 10, color: "rgb(224, 0, 0)" }} />Sunt in culpa qui</span>
                </div>
            </div>
            <button className={styles.exploreBtn}>Explore Now</button>
        </div>
    )
}

export default MTBContent