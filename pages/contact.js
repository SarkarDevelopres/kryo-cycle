import { React, useState, useEffect } from 'react'
import { FaTruckMoving, FaToolbox, FaStore } from "react-icons/fa"
import Navbar from '../comps/Navbar'
import styles from '../styles/contact.module.css'
import Head from 'next/head'
function contact() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
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
        if (e.target.name == 'message') {
            setMessage(e.target.value);
        }
    }
    return (
        <>
            <Head>
                <title>Contact Us</title>
            </Head>
            <section className={styles.main}>
                <div className={styles.maskDiv}>
                    <Navbar color='transparent' page='cnt' />
                    <div className={styles.headerDiv}>
                        <h1>Contact Us</h1>
                    </div>
                </div>
            </section>
            <section className={styles.mapAPI}>

            </section>
            <section className={styles.enquirySection}>
                <div className={styles.enquiryCards}>
                    <FaTruckMoving className={styles.cardIcon} />
                    <div className={styles.cardDetails}>
                    <span>1800-8888-0808</span>
                    <p>Sales Related Enquiries</p>
                    </div>
                </div>
                <div className={styles.enquiryCards}>
                    <FaToolbox className={styles.cardIcon} />
                    <div className={styles.cardDetails}>
                    <span>1800-8888-0808</span>
                    <p>Service Related Enquiries</p>
                    </div>
                </div>
                <div className={styles.enquiryCards}>
                    <FaStore className={styles.cardIcon} />
                    <div className={styles.cardDetails}>
                    <span>1800-8888-0808</span>
                    <p>Dealership Related Enquiries</p>
                    </div>
                </div>
            </section>
            <section className={styles.contactDiv}>
                <div className={styles.contactForm}>
                    <h1>Let's Get In Touch</h1>
                    <div className={styles.contactFormBody}>
                        <div className={styles.dualInputs}>
                            <input type='text' value={firstName} name='fName' onChange={handleChange} placeholder='First name' />
                            <input type='text' value={lastName} name='lName' onChange={handleChange} placeholder='Last name' />
                        </div>
                        <input type='text' value={email} name='email' onChange={handleChange} placeholder='Email address' />
                        <textarea value={message} name='message' onChange={handleChange} placeholder='Enter your message'></textarea>
                        <button>Send Message</button>
                    </div>
                </div>
                <div className={styles.contactDetails}>
                    <h1>Contact Details</h1>
                    <div className={styles.cdParas}>
                        <h2>Our Hours</h2>
                        <p>10:00 AM – 11:00 PM</p>
                        <p>Monday – Friday</p>
                    </div>
                    <div className={styles.cdParas}>
                        <h2>Location</h2>
                        <p>212 7th St SE, Washington, DC 20003, USA</p>
                    </div>
                    <div className={styles.cdParas}>
                        <h2>Contact Us</h2>
                        <p>Phone: 1800-8888-0808</p>
                        <p>Email: contact@company.com</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default contact