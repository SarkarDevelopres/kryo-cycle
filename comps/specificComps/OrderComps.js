import React from 'react'
import styles from '../../styles/componentCSS/orderComp.module.css'
function OrderComps() {
    return (
        <div className={styles.orderProduct}>
            <div className={styles.orderProductImage}></div>
            <div className={styles.orderDetails}>
                <h2>Kryo X26 MTB Model-K</h2>
                <ul className={styles.detailsList}>
                    <li>Ordered on:<br/><span>12:20pm, 5/9/2023</span></li>
                    <li>Expected Delivery on:<br/><span>10/9/2023</span></li>
                    <li>Total Quantity:<br/><span>1</span></li>
                    <li>Total Cost:<br/><span>{'$390 (including taxes)'}</span></li>
                    <li>Payment Status:<br/><span>{'Pre-Paid'}</span></li>
                </ul>
            </div>
        </div>
    )
}

export default OrderComps