import { React, useState } from 'react'
import Navbar from '../comps/Navbar'
import styles from '../styles/bicycle.module.css'
import { FaChevronRight } from "react-icons/fa";
import AccessoryComponent from '../comps/productComps/AccessoryComponent'
import DoubleRangeSlider from '../comps/specificComps/DoubleRangeSlider';
import Link from 'next/link';
import Head from 'next/head'
function accessory({ val, list }) {
  const [productList, setProductList] = useState([...list]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const searchInput = (e) => {
    setSearchKeyword(e.target.value);
  }
  async function fetchFilteredData(data) {
    try {
      let response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/product/productPriceSort`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      });
      let res = await response.json();
      setProductList([...res]);
    } catch (error) {
      console.error('Error fetching filtered data:', error.message);
    }
  }
  function getData(data) {
    fetchFilteredData(data);
  }
  const fetchSearchedData = async () => {
    // console.log("searched");
    if (searchKeyword != '') {
      try {
        let response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/product/keywordSearch`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(searchKeyword),
        });
        let res = await response.json();
        setProductList([...res]);
      } catch (error) {
        console.error('Error fetching searched data:', error.message);
      }
    }
  }
  return (
    <div>
      <Head>
        <title>Accessories</title>
      </Head>
      <Navbar color={"rgb(223 69 62)"} page='acc' />
      <div className={styles.mainDiv}>
        <div className={styles.sideBar}>
          <div className={styles.searchDiv}>
            <p>Search</p>
            <div className={styles.searchBarDiv}>
              <input type='text' value={searchKeyword} name='product' placeholder='Search products..' onChange={searchInput} />
              <span onClick={fetchSearchedData}><FaChevronRight /></span>
            </div>
          </div>
          <div className={styles.filterPriceDiv}>
            <p>Filter By Price</p>
            <DoubleRangeSlider getData={getData} val={val} />
          </div>
          <div className={styles.filterCategoreyDiv}>
            <h3>Filter by Categorey</h3>
            <div className={styles.filterCategoreyOptions}>
              <Link href='/accessory'>Accessories</Link>
              <Link href='/bicycle'>Bicycles</Link>
            </div>
          </div>
        </div>
        <div className={styles.contentDiv}>
          <div className={styles.contentHeading}>
            <span>Home/Accessories</span>
            <h1>Accessories</h1>
          </div>
          <div className={styles.contentFilter}>
            <div>Showing all 4 results</div>
            <div> Sort By </div>
          </div>
          <div className={styles.contentProducts}>
            {
              productList.map((e, index) => {
                return <AccessoryComponent key={index} id={e._id} />
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/product/highestValueAccessoryProduct`);
    const productList = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/product/accessoryProductList`);
    if (!response.ok || !productList.ok) {
      throw new Error('Failed to fetch data');
    }

    const val = await response.json();
    // console.log(val);
    const list = await productList.json();

    // Check if the response contains valid JSON data
    if (!val || !list) {
      throw new Error('Empty or invalid JSON data');
    }
    return { props: { val, list } };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return { props: { val: 100, list: [] } }; // Return default props or handle the error case appropriately
  }

}
// accessoryProductList

export default accessory