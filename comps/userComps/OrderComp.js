import { React, useState, useEffect } from 'react'
import styles from '../../styles/componentCSS/orderComp.module.css'
function OrderComp({ id, qnty, price }) {
    const [productDetails, setProductDetails] = useState({
        Name: "",
        Price: 0,
        Image: "../bicycle-1.jpg",
        ProductPoints: []
    });
    const fetchProductDetails = async (id) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/product/singleProductDetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(id),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch product details');
            }
            const data = await response.json();
            setProductDetails({ ...data.data });
        } catch (error) {
            console.error('Error fetching product details:', error);
            // Handle error state or display error message to the user
        }
    };
    useEffect(() => {
        fetchProductDetails(id);
    }, [id]);
    return (
        <div className={styles.mainDiv}>
            <div className={styles.productImageOrder} style={{ backgroundImage: `url(${productDetails.Image})` }}></div>
            <div className={styles.productContent}>
                <span className={styles.productName}>{productDetails.Name}</span>
                <p>{productDetails.Description}</p>
                <div className={styles.dualDiv}>
                    <span className={styles.productPrice}>₹{price}</span>
                    <span className={styles.productQuantity}>Qnty:{qnty}</span>
                </div>
                <div className={styles.dualDivDelivery}>
                <span>Delivery Status: Yet to specifiy</span>
                    <span>Est. Delivery Date: 10.3.2024</span>
                </div>
            </div>
        </div>
    )
}

export default OrderComp