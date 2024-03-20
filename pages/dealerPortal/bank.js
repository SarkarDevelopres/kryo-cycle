import { React, useEffect, useState } from 'react'
import styles from '../../styles/aboutU.module.css'
import jwt_decode from "jwt-decode";
import DealerSideBar from '../../comps/specificComps/DealerSideBar';
import Head from 'next/head'
function bank() {
    const [bankDetails, setBankDetails] = useState({
        IFSC:'',
        Upi:'',
        AccntNo:null,
        Phone:null
    });
    const searchAddress = async (id) => {
        let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/dealer/fetchAddress`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ id: id }),
        });
        let res = await a.json();
        setBankDetails(JSON.parse(JSON.stringify(res.data)));
    }
    useEffect(() => {
        var token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            searchAddress(decodedToken.id);
        } else {

        }
    }, [])
    const handleAddressChange = (e) => {
        if (e.target.name == 'ifsc') {
            setBankDetails((s) => {
                return {
                    ...s, // Spread the existing object properties
                    IFSC: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
        if (e.target.name == 'upi') {
            setBankDetails((s) => {
                return {
                    ...s, // Spread the existing object properties
                    Upi: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
        if (e.target.name == 'accnt') {
            setBankDetails((s) => {
                return {
                    ...s, // Spread the existing object properties
                    AccntNo: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
        if (e.target.name == 'phone') {
            setBankDetails((s) => {
                return {
                    ...s, // Spread the existing object properties
                    Phone: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
    }
    const addBankDetails = async () => {
        var token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        let bankDetailsToBeSent = {
            IFSC: bankDetails.IFSC,
            Upi: bankDetails.Upi,
            AccntNo: bankDetails.AccntNo,
            Phone: bankDetails.Phone,
        }
        let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/dealer/addBankDetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({id:decodedToken.id,bankDetails:bankDetailsToBeSent}),
        });
        let res = await a.json();
        if (res.message == "Success") {
            alert("Bank Details successfully saved!");
            location.reload();
        }
    }
    return (
        <>
            <Head>
                <title>My Addresses</title>
            </Head>
            <div className={styles.allDealerContent}>
                <DealerSideBar page='add' />
                <div className={styles.aboutUSection}>
                    <h2>Address</h2>
                    <div className={styles.billingAddress}>
                        <div className={styles.billingAddressDetails}>
                            <input type='text' name='ifsc' placeholder="IFSC Code" value={bankDetails.IFSC} onChange={handleAddressChange} />
                                <input type='text' name='upi' placeholder='UPI Id' value={bankDetails.Upi} onChange={handleAddressChange} />
                                <input type='text' name='accnt' placeholder='Account No.' value={bankDetails.AccntNo} onChange={handleAddressChange} />
                                <input type='text' name='phone' placeholder='Phone No.' value={bankDetails.Phone} onChange={handleAddressChange} />
                        </div>
                        <div className={styles.btnS}>
                            <button className={styles.updateBtn} onClick={addBankDetails}>Add Bank Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default bank