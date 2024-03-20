import { React, useState, useEffect } from 'react'
import styles from '../styles/componentCSS/purchaseProduct.module.css'
function PurchaseProduct({ price, name, quantity, image}) {
  // const [productDetails, setProductDetails] = useState([]);
  // const fetchproductDetails = async (id) => {
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/product/singleProductDetails`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json;charset=utf-8',
  //       },
  //       body: JSON.stringify(id),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch product details');
  //     }
  //     const data = await response.json();
  //     setProductDetails({ ...data.data });
  //     // console.log(data.data);
  //   } catch (error) {
  //     console.error('Error fetching product details:', error);
  //     // Handle error state or display error message to the user
  //   }
  // }
  // useEffect(() => {
  //   fetchproductDetails(id);
  // }, [id])

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