import Link from 'next/link';
import { React, useState, useEffect } from 'react'
import Navbar from '../comps/Navbar'
import styles from '../styles/signUp.module.css'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCountries } from 'react-countries'
function signUp() {
    const { countries } = useCountries();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confrmPassword, setConfrmPassword] = useState('');
    const [countryCode, setCountryCode] = useState(100);
    const handleChange = (e) => {
        if (e.target.name == 'fName') {
            setFirstName(e.target.value);
        }
        if (e.target.name == 'lName') {
            setLastName(e.target.value);
        }
        if (e.target.name == 'email') {
            setEmail(e.target.value);
        }
        if (e.target.name == 'phone') {
            setPhone(e.target.value);
        }
        if (e.target.name == 'password') {
            setPassword(e.target.value);
        }
        if (e.target.name == 'confrmPassword') {
            setConfrmPassword(e.target.value);
        }
        if (e.target.name == 'countryCodes') {
            setCountryCode(e.target.value);
        }
    }
    const submitData = async () => {
        if (firstName == '' || lastName == '' || email == '' || phone == '' || password == '' || confrmPassword == '') {
            toast.warn("Fill All Fields!!", {
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
        else {
            if (password != confrmPassword) {
                toast.warn("Password and Confirm password doesn't match!", {
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
                let emailReq = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/emailVerify/singleMail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify({ email: email }),
                });
                let emailRes = await emailReq.json();
                if (emailRes.result == "valid") {
                    var country = countries[countryCode].dial_code;
                    var countryName = countries[countryCode].code;
                    var data = { FirstName: firstName, LastName: lastName, Email: email, CountryCode: country, CountryName: countryName, Phone: phone, Password: password };
                    let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/UserAuth/signUp`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(data)
                    })
                    let res = await a.json();
                    toast.success(`${res.message}`, {
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
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setPhone('');
                    setCountryCode(100);
                    setPassword('');
                    setConfrmPassword('');
                    setTimeout(() => {
                        location.href = `${process.env.NEXT_PUBLIC_PORT}/login`;
                    }, 1000);
                } else {
                    toast.warn("Enter Valid Email !!", {
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
    return (
        <>
            <Head>
                <title>Sign-Up</title>
            </Head>
            <section className={styles.main}>
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
                <div className={styles.maskDiv}>
                    <Navbar color='transparent' page='sig' />
                    <div className={styles.topDiv}>
                        <h1>Join The Adventure</h1>
                    </div>
                    <div className={styles.formDiv}>
                        <div className={styles.form}>
                            <h2>Sign-Up</h2>
                            <div className={styles.dualInputs}>
                                <input type='text' value={firstName} name='fName' onChange={handleChange} placeholder='First name' />
                                <input type='text' value={lastName} name='lName' onChange={handleChange} placeholder='Last name' />
                            </div>
                            <input type='text' value={email} name='email' onChange={handleChange} placeholder='Email address' />
                            <div className={styles.phoneInputdiv}>
                                <select name='countryCodes' value={countryCode} onChange={handleChange}>
                                    {countries.map(({ name, dial_code, code, flag }, index) => (
                                        <option key={code} value={`${index}`}>{code + " " + "(" + dial_code + ")"}</option>)
                                    )}
                                </select>
                                <input type='number' value={phone} name='phone' onChange={handleChange} placeholder='Phone number' />
                            </div>
                            <div className={styles.dualInputs}>
                                <input type='password' value={password} name='password' onChange={handleChange} placeholder='Password' />
                                <input type='password' value={confrmPassword} name='confrmPassword' onChange={handleChange} placeholder='Confirm password' />
                            </div>
                            <button onClick={submitData}>Sign Up</button>
                        </div>
                        <span>Already Signed Up? then, <Link href='/login'>LogIn</Link></span>
                    </div>
                </div>
            </section>
        </>
    )
}
// export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch(`https://countryapi.io/api/all?apikey=3N2ZQcvEMwxTHk6mdkClWWpKxXLyNZCeLbM6g3Tl`)
//     const data = await res.json()

//     // Pass data to the page via props
//     return { props: { data } }
//   }
export default signUp

