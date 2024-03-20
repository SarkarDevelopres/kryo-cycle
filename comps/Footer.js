import React from 'react'
import styles from '../styles/Home.module.css'
import { FaInstagram,FaFacebook,FaTwitter,FaYoutube} from "react-icons/fa";
import Link from 'next/link';
function Footer() {
  return (
    <section className={styles.footer}>
        <div className={styles.footerDiv}>
          <div><img src="../logo_bike.png"/></div>
          <div>
            <h2>Usefull Links</h2>
            <Link href='/'>Home</Link>
            <Link href='/bicycle'>Shop</Link>
            <Link href='/about'>About Us</Link>
            <Link href='/contact'>Contact</Link>
          </div>
          <div>
            <h2>Our Collection</h2>
            <Link href='/'>Mountain Bikes</Link>
            <Link href='/'>City Bikes</Link>
            <Link href='/'>Speciality Bikes</Link>
            <Link href='/'>Electric Bikes</Link>
          </div>
          <div>
            <h2>Account</h2>
            <Link href='/login'>Customer Login</Link>
            <Link href='/dealerPortal/login'>Dealer Login</Link>
            <Link href='/'>Address</Link>
            <Link href='/'>Payment Methods</Link>
          </div>
        </div>
        <div className={styles.footerDiv2}>
          <div>Copyright © 2023 Cycle Shop</div>
          <div className={styles.footerIcons}>
            <FaFacebook/>
            <FaTwitter/>
            <FaInstagram/>
            <FaYoutube/>
          </div>
        </div>
      </section>
  )
}

export default Footer