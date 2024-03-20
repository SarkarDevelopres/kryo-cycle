import { React, useEffect, useState } from 'react'
import Navbar from '../../comps/Navbar'
import styles from '../../styles/aboutU.module.css'
import jwt_decode from "jwt-decode";
import SideBar from '../../comps/userComps/SideBar'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function aboutUser() {
    const [verified, setVerified] = useState({ email: false, phone: false })
    const [changEmail, setChangEmail] = useState('');
    const [changPhone, setChangPhone] = useState('');
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [color, setcolor] = useState({
        email: 'rgb(180,0,0)',
        phone: 'rgb(180,0,0)'
    })
    const router = useRouter();
    const [user, setUser] = useState({});
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
    const updateDetails = async () => {
        if (!verified.phone == true) {
            let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/phoneverify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ id: user._id, email: verified.email }),
            });
            let res = await a.json();
            if (res.message == "Success") {
                toast.success('Phone Verified!', {
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
        } else {
            toast.success('Phone Verified!', {
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
        }
    }
    const verifyEmail = async () => {
        if (!verified.email == true) {
            let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/emailVerify/singleMail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ email: user.Email }),
            });
            let response = await a.json();
            console.log(response);
            if (response.result == 'valid') {
                let b = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/emailVerify/updateEmailStatus`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify({ id: user._id, phone: verified.phone }),
                });
                let res = await b.json();
                if (res.message == "Success") {
                    toast.success('Email Verified!', {
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
        } else {
            toast.success('Email is already verified', {
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
        }
    }
    const updateEmail = async () => {
        if (changEmail == user.Email) {
            toast.success('Successfully Changed!', {
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
            if (changEmail=='') {
                toast.warn('Enter a Valid Email!!', {
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
                let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/emailVerify/singleMail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify({ email: changEmail }),
                });
                let response = await a.json();
                if (response.result == 'valid') {
                    let data = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/userCred/emailUpdate`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                        },
                        body: JSON.stringify({ id: user._id, email: changEmail }),
                    });
                    let res = await data.json();
                    if (res.message == 'Success') {
                        toast.success('Successfully Changed!', {
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
                } else {
                    toast.warn('Enter a Valid Email!!', {
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
                }
            }
        }
    }
    const updatePhone = async () => {
        if (changPhone == user.Phone) {
            toast.success('Successfully Changed!', {
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
            if (changPhone.length == 10) {
                let number = parseInt(changPhone);
                if (number) {
                    let data = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/userCred/phoneUpdate`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                        },
                        body: JSON.stringify({ id: user._id, phone: changPhone }),
                    });
                    let res = await data.json();
                    if (res.message == 'Success') {
                        toast.success('Successfully Changed!', {
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
                } else {
                    toast.error("Don't Joke around !!", {
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
            } else {
                toast.warn('Enter a Valid Phone Number!!', {
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
            }
        }
    }
    const updatePass = async () => {
        let data = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/userCred/changePassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ id: user._id, currentPass: currentPass, newPass: newPass }),
        });
        let res = await data.json();
        if (res.message == 'Success') {
            toast.success('Successfully Changed!', {
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
        else if (res.message == 'Failure') {
            toast.error('Password Dont Match!!', {
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
    }
    const handleChange = (e) => {
        if (e.target.name == 'email') {
            setChangEmail(e.target.value)
        }
        if (e.target.name == 'phone') {
            setChangPhone(e.target.value)
        }
        if (e.target.name == 'currentPass') {
            setCurrentPass(e.target.value)
        }
        if (e.target.name == 'newPass') {
            setNewPass(e.target.value)
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwt_decode(token);
            if (decodedToken.categorey == 'user') {
                userDetails(decodedToken)
                    .then((userData) => {
                        setUser(JSON.parse(JSON.stringify(userData)));
                        setVerified({ ...userData.Verified })
                        if (userData.Verified.email && !userData.Verified.phone) {
                            setcolor((s) => {
                                return {
                                    ...s, email: 'rgb(0,150,0)'
                                }
                            })
                        }
                        else if (userData.Verified.phone && !userData.Verified.email) {
                            setcolor((s) => {
                                return {
                                    ...s, phone: 'rgb(0,150,0)'
                                }
                            })
                        }
                        else if (userData.Verified.phone && userData.Verified.email) {
                            setcolor((s) => {
                                return {
                                    email: 'rgb(0,150,0)',
                                    phone: 'rgb(0,150,0)'
                                }
                            })
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching user details:', error);
                        // Handle the error as needed, e.g., show an error message to the user.
                    });
            } else {
                router.push(`${process.env.NEXT_PUBLIC_PORT}/dealerPortal`);
                toast.error('Invalid Access!!', {
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
            // }
        }
    }, []);
    return (
        <>
            <Head>
                <title>My Profile</title>
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
                <SideBar page='profile' />
                <div className={styles.aboutUSection}>
                    <h2>My Profile</h2>
                    <div className={styles.aboutUContent}>
                        <div className={styles.detailsDiv}>
                            <h2>Your Details</h2>
                            <div className={styles.credentials}>
                                <p>Name:</p><span>{user.FirstName + " " + user.LastName}</span>
                            </div>
                            <div className={styles.credentials}>
                                <p>Email:</p><span>{user.Email}</span><div style={{ color: `${color.email}` }} className={styles.verification}>{verified.email ? "Verified" : "Not Verified"}</div>
                            </div>
                            <div className={styles.credentials}>
                                <p>Phone:</p><span>{user.CountryCode + " " + user.Phone}</span><div style={{ color: `${color.phone}` }} className={styles.verification}>{verified.phone ? "Verified" : "Not Verified"}</div>
                            </div>
                            <div className={styles.verifyBtn}>
                                <button className={styles.updateBtn} onClick={verifyEmail}>Verify Email</button>
                                <button className={styles.updateBtn} onClick={updateDetails}>Verify Phone</button>
                            </div>
                        </div>
                        <div className={styles.chngCredDiv}>
                            <div className={styles.chngEmail}>
                                <h2>Change Email</h2>
                                <div className={styles.chngField}>
                                    <input name='email' value={changEmail} onChange={handleChange} placeholder='New Email' />
                                    <button className={styles.updateBtn} onClick={updateEmail}>Update</button>
                                </div>
                            </div>
                            <div className={styles.chngPhone}>
                                <h2>Change Phone</h2>
                                <div className={styles.chngField}>
                                    <input name='phone' value={changPhone} onChange={handleChange} placeholder='New Phone' />
                                    <button className={styles.updateBtn} onClick={updatePhone} >Update</button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.updtPassword}>
                            <h2>Update Password</h2>
                            <div className={styles.passwordFields}>
                                <input name='currentPass' type='text' value={currentPass} onChange={handleChange} placeholder='Current Password' />
                                <input name='newPass' type='text' value={newPass} onChange={handleChange} placeholder='New Password' />
                                <button className={styles.updateBtn} onClick={updatePass}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default aboutUser