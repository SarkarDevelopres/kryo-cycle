import { React, useState, useEffect } from 'react'
import Link from 'next/link';
import Navbar from '../comps/Navbar'
import styles from '../styles/signUp.module.css'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCountries } from 'react-countries'
function login() {
    const { countries } = useCountries();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState(100);

    const handleChange = (e) => {
        if (e.target.name == 'email') {
            setEmail(e.target.value);
        }
        if (e.target.name == 'phone') {
            setPhone(e.target.value);
        }
        if (e.target.name == 'password') {
            setPassword(e.target.value);
        }
        if (e.target.name == 'countryCodes') {
            setCountryCode(e.target.value);
        }
    }
    const submitData = async () => {
        if (email == '' || phone == '' || password == '') {
            toast.warn('Fill All Fileds!!', {
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
            var country = countries[countryCode].dial_code;
            var data = { Email: email, CountryCode: country, Phone: phone, Password: password };
            let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/UserAuth/logIn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
            let res = await a.json();
            if (res.message == "You're Logged In Successfully!") {
                localStorage.setItem('token', res.token);
                toast.success("You're Logged In Successfully!!", {
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
                setEmail('');
                setPhone('');
                setCountryCode(100);
                setPassword('');
                setTimeout(() => {
                    location.href = `${process.env.NEXT_PUBLIC_PORT}/user`;
                }, 1000);
            }
            else {
                toast.error(`${res.message}`, {
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
                setEmail('');
                setPhone('');
                setCountryCode(100);
                setPassword('');
            }
        }
    }
    return (
        <>
            <Head>
                <title>Log-In</title>
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
                    <Navbar color='transparent' page='log' />
                    <div className={styles.topDiv}>
                        <h1>Welcome Adventurer!</h1>
                    </div>
                    <div className={styles.formDiv}>
                        <div className={styles.form}>
                            <h2>Log-In</h2>
                            <input type='text' value={email} name='email' onChange={handleChange} placeholder='Email address' />
                            <div className={styles.phoneInputdiv}>
                                <select name='countryCodes' value={countryCode} onChange={handleChange}>
                                    {countries.map(
                                        ({
                                            name,
                                            dial_code,
                                            code,
                                            flag
                                        }, index) => (
                                            <option key={code} value={`${index}`}>{code + " " + "(" + dial_code + ")"}</option>
                                        )
                                    )}
                                </select>
                                <input type='number' value={phone} name='phone' onChange={handleChange} placeholder='Phone number' />
                            </div>
                            <input type='password' value={password} name='password' onChange={handleChange} placeholder='Password' />
                            <button onClick={submitData}>Log-In</button>
                        </div>
                        <span>Not Signed Yet? then, <Link href='/signUp'>SignUp</Link></span>
                    </div>
                </div>
            </section>
        </>
    )
}

export default login