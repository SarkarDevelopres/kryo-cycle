import Link from 'next/link';
import { React, useState, useEffect } from 'react'
import styles from '../../styles/signUp.module.css'
import Head from 'next/head'
import { useCountries } from 'react-countries'
import { useRouter } from 'next/router'
function dealerSignUp() {
    const router = useRouter();
    const { countries } = useCountries();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confrmPassword, setConfrmPassword] = useState('');
    const [countryCode, setCountryCode] = useState(100);
    const handleChange = (e) => {
        if (e.target.name == 'name') {
            setName(e.target.value);
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
    const submitData = async()=>{
        if (name == ''||email==''||phone==''||password==''||confrmPassword=='') {
            alert("Fill All Fields!");
        }
        else{
            if (password!=confrmPassword) {
                alert("Password and Confirm password doesn't match!")
            } else {
                var country = countries[countryCode].dial_code;
                var countryName = countries[countryCode].code;
                var data = {Name:name,Email:email,CountryCode:country,CountryName:countryName,Phone:phone,Password:password};
                let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/DealerAuth/signUp`,{
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(data)
                })
                let res = await a.json();
                alert(res.message);
                setName('');
                setEmail('');
                setPhone('');
                setCountryCode(100);
                setPassword('');
                setConfrmPassword('');
                setTimeout(() => {
                    router.push(`${process.env.NEXT_PUBLIC_PORT}/dealerPortal/login`);
                }, 1000);
            }
        }
    }
    return (
        <>
            <Head>
                <title>Sign-Up</title>
            </Head>
            <section className={styles.main}>
                <div style={{padding:'90px'}} className={styles.maskDiv}>
                    <div className={styles.topDiv}>
                        <h1>Become A Dealer</h1>
                    </div>
                    <div className={styles.formDiv}>
                        <div className={styles.form}>
                            <h2>Sign-Up</h2>
                            <input type='text' value={name} name='name' onChange={handleChange} placeholder='Name' />
                            <input type='text' value={email} name='email' onChange={handleChange} placeholder='Email address' />
                            <div className={styles.phoneInputdiv}>
                                <select name='countryCodes' value={countryCode} onChange={handleChange}>
                                    {countries.map(({name,dial_code,code,flag},index) => (
                                            <option key={code} value={`${index}`}>{code+" "+"("+dial_code+")"}</option>)
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
                        <span>Already Signed Up? then, <Link href='/dealerPortal/login'>LogIn</Link></span>
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
export default dealerSignUp

