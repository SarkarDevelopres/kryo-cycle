import { React, useEffect, useState } from 'react'
import { FaUser, FaPowerOff } from "react-icons/fa";
import { BsFillHouseFill, BsFillCreditCard2BackFill, BsCurrencyExchange, BsBagHeartFill, BsFillBagFill, BsJustify } from "react-icons/bs";
import { IoCloseCircleOutline } from "react-icons/io5";
import Link from 'next/link'
import styles from '../../styles/componentCSS/sideBar.module.css'
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfirmToast } from 'react-confirm-toast'
function SideBar({ page }) {
    const router = useRouter();
    const [name, setName] = useState('');
    const [menuBtn, setmenuBtn] = useState(<BsJustify />);
    var prof = <span>My Profile <FaUser /></span>
    var add = <div><span>Address</span> <BsFillHouseFill /></div>
    var card = <div><span>Add Cards</span> <BsFillCreditCard2BackFill /></div>
    var upi = <div><span>Add UPI</span> <BsCurrencyExchange /></div>
    var order = <div><span>My Orders</span> <BsFillBagFill /></div>
    var wish = <div><span>My Wishlist</span> <BsBagHeartFill /></div>
    if (page == 'profile') {
        prof = <div style={{ color: 'rgb(200 69 62)' }}><span>My Profile</span> <FaUser /></div>
    }
    if (page == 'address') {
        add = <div style={{ color: 'rgb(200 69 62)' }}><span>Address</span> <BsFillHouseFill /></div>
    }
    if (page == 'card') {
        card = <div style={{ color: 'rgb(200 69 62)' }}><span>Add Cards</span> <BsFillCreditCard2BackFill /></div>
    }
    if (page == 'upi') {
        upi = <div style={{ color: 'rgb(200 69 62)' }}><span>Add UPI</span> <BsCurrencyExchange /></div>
    }
    if (page == 'order') {
        order = <div style={{ color: 'rgb(200 69 62)' }}><span>My Orders</span> <BsFillBagFill /></div>
    }
    const logOut = () => {
        toast.success(`You're Logged Out!`, {
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
        localStorage.removeItem('token');
        router.push(`${process.env.NEXT_PUBLIC_PORT}`);
    }
    const userDetails = async (data) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/userDetailsFetch`, {
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
    const openNav = () => {
        if (menuBtn.type.name == "BsJustify") {
            document.getElementById('links').style.display = 'flex';
            // document.getElementById('links').style.opacity = 1;
            setmenuBtn(<IoCloseCircleOutline />);
        }
        else {
            document.getElementById('links').style.display = 'none';
            setmenuBtn(<BsJustify />);
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            var currentTimeMilliseconds = (new Date().getTime()) / 1000;
            var time = parseInt(currentTimeMilliseconds)
            if (time > decodedToken.exp) {
                localStorage.removeItem('token');
                location.href = `${process.env.NEXT_PUBLIC_PORT}/`
                toast.error(`Session Expired!!`, {
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
            }
            else {
                userDetails(decodedToken)
                    .then((userData) => {
                        setName(userData.FirstName)
                    })
                    .catch((error) => {
                        console.error('Error fetching user details:', error);
                        // Handle the error as needed, e.g., show an error message to the user.
                    });
            }
        }
        else {
            location.href = `${process.env.NEXT_PUBLIC_PORT}/`
            toast.error(`Login First!!`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                // transition: Bounce,
            });
        }
    }, []);
    return (
        <div className={styles.sideBar}>
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
            <div className={styles.greetigsDiv}>
                <h2>Hello {name}</h2>
                <span className={styles.menu} onClick={openNav}>
                    {menuBtn}
                </span>
            </div>
            <div id='links' className={styles.sideBarLinks}>
                <Link href='/user'>{prof}</Link>
                <Link href='/user/address'>{add}</Link>
                <Link href='/user/card'>{card}</Link>
                <Link href='/user/upi'>{upi}</Link>
                <Link href='/user/orders'>{order}</Link>
                <Link href='/'>{wish}</Link>
                <ConfirmToast asModal={false}
                    customCancel={'Cancel'}
                    customConfirm={'Confirm'}
                    customFunction={logOut}
                    message={'Do you want to LogOut?'}
                    position={'top-left'}
                    showCloseIcon={false}
                    theme={'light'}>
                    {<button><span>Log-Out</span> <FaPowerOff /></button>}
                </ConfirmToast>
            </div>
        </div>
    )
}

export default SideBar