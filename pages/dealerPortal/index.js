import { React, useEffect, useState } from 'react'
import Footer from '../../comps/Footer'
import Navbar from '../../comps/Navbar'
import styles from '../../styles/aboutU.module.css'
import jwt_decode from "jwt-decode";
import DealerSideBar from '../../comps/specificComps/DealerSideBar'
import Head from 'next/head'
// user.Address ? user.Address.LaneNumber : ''
function aboutDealer() {
    const [dealer, setDealer] = useState({});

    const dealerDetails = async (data) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/dealer/dealerDetailsFetch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                return responseData.data;
            } else {
                throw new Error('Failed to fetch dealer details');
            }
        } catch (error) {
            console.error('Error:', error);
            throw error; // Rethrow the error to handle it higher up in your component hierarchy
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwt_decode(token);

            dealerDetails(decodedToken)
                .then((dealerData) => {
                    setDealer(JSON.parse(JSON.stringify(dealerData)));
                })
                .catch((error) => {
                    console.error('Error fetching dealer details:', error);
                    // Handle the error as needed, e.g., show an error message to the user.
                });
        }
    }, []);

    const ordersHistory = () => {
        document.getElementById('ordersHistory').style.opacity = 1;
        document.getElementById('currentOrders').style.opacity = 0.4;
    }
    return (
        <>
            <Head>
                <title>My Profile</title>
            </Head>
            <div className={styles.allDealerContent}>
                <DealerSideBar page='profile' />
                <div className={styles.aboutUSection}>
                    <h2>My Profile</h2>
                    <div className={styles.aboutUContent}>
                        <div className={styles.detailsDiv}>
                            <h2>Your Details</h2>
                            <div className={styles.credentials}>
                                <p>Name:</p><span>{dealer.Name}</span>
                            </div>
                            <div className={styles.credentials}>
                                <p>Email:</p><span>{dealer.Email}</span>
                            </div>
                            <div className={styles.credentials}>
                                <p>Phone:</p><span>{dealer.CountryCode + " " + dealer.Phone}</span>
                            </div>
                            <div className={styles.credentials}>
                                <p>Verified:</p><span>{'Email Phone'}</span>
                            </div>
                            <button className={styles.updateBtn}>Update</button>
                        </div>

                    </div>
                </div>
            </div>
            {/* <section className={styles.Orders}>
                <div className={styles.maskDiv2}>
                <div className={styles.yourOrders}>
                    <div className={styles.ordersOptionHeader}>
                        <h2 id='currentOrders'>Your Orders</h2>
                        <h2 id='ordersHistory' className={styles.ordersHistoryHead} onClick={ordersHistory}>Orders History</h2>
                    </div>
                    <div className={styles.ordersList}>
                        
                    </div>
                </div>
                </div>
            </section> */}
        </>
    )
}

export default aboutDealer