import { useEffect, useState } from 'react';
import styles from '../styles/componentCSS/navbar.module.css';
import { FaShoppingCart } from 'react-icons/fa';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import Link from 'next/link';
import { IoClose, IoCloseCircleOutline } from 'react-icons/io5';
import CartComponent from './CartComponent';
import { BiMenuAltRight } from "react-icons/bi";
import BuyNow from './BuyNow';
function Navbar({ color, page }) {
  const router = useRouter();
  const [menuBtn, setmenuBtn] = useState(< BiMenuAltRight size={40} color={'rgb(255,255,255)'} />);
  const [cartBtn, setCartBtn] = useState(<Link href="/bicycle" className={styles.shoppingBtn}>Continue Shopping</Link>);
  const [cartDetails, setCartDetails] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchCartDetails = async (decodedToken) => {
      setLoggedIn(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/cart/fetchCartDetails`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({ userId: decodedToken.id }),
        });
        const data = await response.json();
        localStorage.setItem("cartItems", JSON.stringify(data));
        setCartDetails(data);
        if (data.length != 0) {
          setCartBtn(<BuyNow />)
        }
      } catch (error) {
        console.error('Error fetching cart details:', error);
      }
    };

    if (localStorage.getItem('token')) {
      const decodedToken = jwt_decode(localStorage.getItem('token'));
      const currentTimeMilliseconds = new Date().getTime() / 1000;
      const time = parseInt(currentTimeMilliseconds);
      if (time > decodedToken.exp) {
        alert('Session Expired!!');
        localStorage.removeItem('token');

        location.reload();
      } else {
        if (decodedToken.categorey === 'user') {
          fetchCartDetails(decodedToken);
        } else {
          alert('Invalid Access!!');
          router.push(`${process.env.NEXT_PUBLIC_PORT}/dealerPortal`);
        }
      }
    }
  }, []);
  const subNav = () => {
    if (menuBtn.type.name === "BiMenuAltRight") {
      document.getElementById('mainNav').style.paddingBottom = '100px';
      document.getElementById('resNav').style.right = '0vw';
      document.getElementById('resNav').style.opacity = 1;
      setmenuBtn(<IoCloseCircleOutline color={'rgb(255,255,255)'} size={40} />);
    }
    else {
      document.getElementById('mainNav').style.paddingBottom = '0px';
      document.getElementById('resNav').style.right = '-100vw';
      document.getElementById('resNav').style.opacity = 0.4;
      setmenuBtn(< BiMenuAltRight size={40} color={'rgb(255,255,255)'} />);
    }
  }
  const toHome = () => {
    router.push(`${process.env.NEXT_PUBLIC_PORT}`);
  };

  const openSideCart = () => {
    document.getElementById('cart').style.right = '0vw';
  };

  const closeSideCart = () => {
    document.getElementById('cart').style.right = '-100vw';
  };

  const renderNavItem = (text, link, isActive) => (
    <Link href={link}>
      <span style={{ color: isActive ? 'rgb(255, 64, 54)' : 'inherit' }}>{text}</span>
    </Link>
  );
  const AboutU = (text, link, isActive) => {
    if (loggedIn) {
      return <Link href={'/user'}>
        <span style={{ color: page === 'abtUser' ? 'rgb(255, 64, 54)' : 'inherit' }}>{'About You'}</span>
      </Link>
    }
    else {
      if (page === 'log') {
        return <Link href={link}>
          <span style={{ color: 'rgb(255, 64, 54)' }}>{'LogIn'}</span>
        </Link>
      } else {
        return <Link href={link}>
          <span style={{ color: page === 'sig' ? 'rgb(255, 64, 54)' : 'inherit' }}>{text}</span>
        </Link>
      }
    }
  }

  return (
    <div className={styles.navBar} style={{ backgroundColor: color }}>
      <div id='mainNav' className={styles.mainNav}>
        <div className={styles.logo} onClick={toHome}>
          <img src="../logo_bike.png" alt="Logo" />
        </div>
        <div className={styles.navBtns}>
          {renderNavItem('Home', '/', page === 'h')}
          {renderNavItem('Bicycles', '/bicycle', page === 'bi')}
          {renderNavItem('Accessories', '/accessory', page === 'acc')}
          {renderNavItem('About Us', '/about', page === 'abt')}
          {renderNavItem('Contact Us', '/contact', page === 'cnt')}
          {AboutU('SignUp', '/signUp', page === 'sig' || page === 'log')}
          {/* {renderNavItem('About You', '/user', page === 'abtUser')} */}
        </div>
        <div className={styles.iconsDiv}>
          <span className={styles.cartBtn} onClick={openSideCart}><FaShoppingCart size={30} /></span>
          <span id='menuBtn' className={styles.menuBtn} onClick={subNav}>{menuBtn}</span>
        </div>
      </div>
      <div id='resNav' className={styles.responsiveNav}>
        <div className={styles.resNavDivs}>
          {renderNavItem('Home', '/', page === 'h')}
          {renderNavItem('Bicycles', '/bicycle', page === 'bi')}
          {renderNavItem('Accessories', '/accessory', page === 'acc')}
        </div>
        <div className={styles.resNavDivs}>
          {renderNavItem('About Us', '/about', page === 'abt')}
          {renderNavItem('Contact Us', '/contact', page === 'cnt')}
          {AboutU('SignUp', '/signUp', page === 'sig' || page === 'log')}
        </div>

      </div>
      {/* <div className={styles.cartFullDiv}> */}
      <div id="cart" className={styles.cartMenu}>
        <div className={styles.cartHead}>
          <p>Shopping Cart</p>
          <span className={styles.closeBtn} onClick={closeSideCart}><IoClose /></span>
        </div>
        <div className={styles.horizontalLine}></div>
        <div className={styles.cartCompList}>
          {cartDetails.map((item, index) => (
            <CartComponent key={index} cartId={item._id} id={item.productId} userId={item.userId} quantity={item.Quantity} ind={index} />
          ))}
        </div>
        <div>{cartBtn}</div>
      </div>
    </div>
  );
}

export default Navbar;
