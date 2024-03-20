import { React, useState, useEffect } from 'react'
import styles from '../styles/componentCSS/purchaseProduct.module.css'
function PurchaseProduct({ price, name, quantity, image}) {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.productImage} style={{backgroundImage:`url(${image})`}}></div>
      <div className={styles.productDetails}>
        <div className={styles.productName}>{name}</div>
        <div className={styles.productPrice}>Price: <span>₹{price}</span></div>
        <div className={styles.productQuantity}>Qnty: {quantity}</div>
      </div>
    </div>
  )
}


export default PurchaseProduct