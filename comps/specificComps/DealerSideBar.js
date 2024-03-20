import {React,useEffect,useState} from 'react'
import { FaUser, FaPowerOff,FaClipboardList } from "react-icons/fa";
import { BsCurrencyExchange } from "react-icons/bs";
import { BiSolidFactory } from "react-icons/bi";
import Link from 'next/link'
import styles from '../../styles/componentCSS/sideBar.module.css'
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/router'
function SideBar({page}) {
    const router = useRouter();
    const [name, setName] = useState('')
    var prof = <span>My Profile <FaUser /></span>
    var add = <span>Add Address <BiSolidFactory /></span>
    var bank = <span>Bank Accnt <BsCurrencyExchange /></span>
    var prod = <span>My Products <FaClipboardList /></span>
    if(page=='profile'){
        prof=<span style={{color:'rgb(200 69 62)'}}>My Profile <FaUser /></span>
    }
    if(page=='add'){
        add=<span style={{color:'rgb(200 69 62)'}}>Add Address <BiSolidFactory /></span>
    }
    if(page=='prod'){
        prod=<span style={{color:'rgb(200 69 62)'}}>My Products <FaClipboardList /></span>
    }
    if(page=='bank'){
        bank=<span style={{color:'rgb(200 69 62)'}}>Bank Accnt <BsCurrencyExchange /></span>
    }
    const logOut = ()=>{
        if (confirm('Are you sure you want to Log-Out?')) {
          alert("You're Logged Out!")
          localStorage.removeItem('token');
          router.push(`${process.env.NEXT_PUBLIC_PORT}`);
        }
       }
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
                throw new Error('Failed to fetch user details');
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
                    setName(dealerData.Name)
                })
                .catch((error) => {
                    console.error('Error fetching user details:', error);
                    // Handle the error as needed, e.g., show an error message to the user.
                });
        }
    }, []);
    return (
        <div className={styles.sideBar}>
            <h2>Hi {name}</h2>
            <div className={styles.sideBarLinks}>
                <Link href='/dealerPortal'>{prof}</Link>
                <Link href='/dealerPortal/address'>{add}</Link>
                <Link href='/dealerPortal/products'>{prod}</Link>
                <Link href='/dealerPortal/bank'>{bank}</Link>
                <button onClick={logOut}>Log-Out <FaPowerOff /></button>
            </div>
        </div>
    )
}

export default SideBar