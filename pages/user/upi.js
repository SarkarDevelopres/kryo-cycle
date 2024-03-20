import { React, useEffect, useState } from 'react'
import Navbar from '../../comps/Navbar'
import styles from '../../styles/aboutU.module.css'
import jwt_decode from "jwt-decode";
import SideBar from '../../comps/userComps/SideBar';
import UPIComp from '../../comps/userComps/UPIComp';
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function upi() {
    const [upis, setUPIs] = useState([]);
    const [upi, setUPI] = useState({
        userId: '',
        UPINo: '',
        PhoneNo: '',
        isDefault: ''
    });
    const searchUPI = async (id) => {
        let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/upi/searchUPI`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ id: id }),
        });
        let res = await a.json();
        if (res.data.length != 0) {
            setUPIs(JSON.parse(JSON.stringify(res.data)));
        } else {
            console.log(res.data);
        }
    }
    useEffect(() => {
        var token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            searchUPI(decodedToken.id);
        } else {

        }
    }, [])
    const handleUPIChange = (e) => {
        if (e.target.name == 'upiNo') {
            setUPI((s) => {
                return {
                    ...s, // Spread the existing object properties
                    UPINo: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
        if (e.target.name == 'phnNo') {
            setUPI((s) => {
                return {
                    ...s, // Spread the existing object properties
                    PhoneNo: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
    }
    const addUPI = async () => {
        var token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        if (upi.UPINo == "" || upi.PhoneNo == "") {
            toast.warn('Enter all fields !!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                // transition: Bounce,
            });
        } else {
            let upiToBeSent = {
                userId: decodedToken.id,
                UPINo: upi.UPINo,
                PhoneNo: upi.PhoneNo,
                isDefault: upi.isDefault
            }
            let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/upi/addUPI`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(upiToBeSent),
            });
            let res = await a.json();
            if (res.message == "Success") {
                toast.success('UPI successfully saved!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    // transition: Bounce,
                });
                location.reload();
            }
        }

    }
    return (
        <>
            <Head>
                <title>My UPIs</title>
            </Head>
            <Navbar color='rgb(223 69 62)' page='abtUser' />
            <div className={styles.allContent}>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                    theme="colored"
                />
                <SideBar page='upi' />
                <div className={styles.aboutUSection}>
                    <h2>UPIs</h2>
                    <div className={styles.addressContent}>
                        {upis.map((e, index) => {
                            return <UPIComp no={index} id={e._id} userId={e.userId} upiNo={e.UPINo} phnNo={e.PhoneNo} def={e.isDefault} />
                        })}
                    </div>
                    <div className={styles.billingAddress}>
                        <div className={styles.billingAddressDetails}>
                            <input type='text' name='upiNo' placeholder="UPI Number" value={upi.UPINo} onChange={handleUPIChange} />
                            <input type='number' name='phnNo' placeholder="Phone Number" value={upi.CardNo} onChange={handleUPIChange} />
                        </div>
                        <div className={styles.btnS}>
                            <button className={styles.updateBtn} onClick={addUPI}>Add UPI+</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default upi