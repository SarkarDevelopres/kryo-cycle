import Link from 'next/link';
import { React, useState, useEffect } from 'react'
import { IoStar, IoStarOutline } from "react-icons/io5";
import { getServerSideProps } from '../../pages/bicycle';
import styles from '../../styles/componentCSS/productCompo.module.css'
function BikeComponent({ id }) {
  const [productData, setProductData] = useState({});
  const fetchProductList = async (id) => {
    let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/product/singleProductDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(id),
    })
    let res = await a.json();
    setProductData({ ...res.data });
  }
  useEffect(() => {
    fetchProductList(id);
  }, [id]);
  return (
    <a href={`/products/${id}/`} className={styles.mainDiv}>
      <div className={styles.image} style={{ backgroundImage: `url(${productData.Image})` }}></div>
      <div className={styles.productDetails}>
        <span className={styles.productCategorey}>{productData.Categorey}</span>
        <span className={styles.productName}>{productData.Name}</span>
        <div className={styles.productRatings}>
          <span>
            {Array.from({ length: productData.Rating }).map((e, index) => (
              <IoStar key={index} />
            ))}
          </span>
          <span>
            {Array.from({ length: 5 - productData.Rating }).map((e, index) => (
              <IoStarOutline key={index} />
            ))}
          </span>
        </div>
        <span className={styles.productPrice}>₹{productData.Price}</span>
      </div>
    </a>
  )
}

export default BikeComponent