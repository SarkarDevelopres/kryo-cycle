import { useState } from 'react';
import Navbar from '../comps/Navbar';
import styles from '../styles/bicycle.module.css';
import { FaChevronRight } from "react-icons/fa";
import BikeComponent from '../comps/productComps/BikeComponent';
import DoubleRangeSlider from '../comps/specificComps/DoubleRangeSlider';
import Head from 'next/head';
import Link from 'next/link';

function Bicycle({ val, list }) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [productList, setProductList] = useState([...list]);

  const searchInput = (e) => {
    setSearchKeyword(e.target.value);
  }

  async function fetchFilteredData(data) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/product/productPriceSort`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      setProductList([...res]);
    } catch (error) {
      console.error('Error fetching filtered data:', error.message);
    }
  }

  const fetchSearchedData = async () => {
    if (searchKeyword !== '') {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/product/keywordSearch`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(searchKeyword),
        });
        const res = await response.json();
        setProductList([...res]);
      } catch (error) {
        console.error('Error fetching searched data:', error.message);
      }
    }
  }

  function getData(data) {
    fetchFilteredData(data);
  }

  return (
    <div>
      <Head>
        <title>Bicycles</title>
      </Head>
        <Navbar color={"rgb(223 69 62)"} page='bi'/>
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
            <h3>Filter by Category</h3>
            <div className={styles.filterCategoreyOptions}>
              <Link href='/accessory'>Accessories</Link>
              <Link href='/bicycle'>Bicycles</Link>
            </div>
          </div>
        </div>
        <div className={styles.contentDiv}>
          <div className={styles.contentHeading}>
            <span>Home/Bicycles</span>
            <h1>Bicycles</h1>
          </div>
          <div className={styles.contentFilter}>
            <div>Showing all {productList.length} results</div>
            <div> Sort By </div>
          </div>
          <div className={styles.contentProducts}>
            {
              productList.map((e, index) => (
                <BikeComponent id={e._id} key={index}/>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/product/highestValueBicycleProduct`);
    const productList = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/product/bicyleProductList`);
    if (!response.ok || !productList.ok) {
      throw new Error('Failed to fetch data');
    }

    const val = await response.json();
    const list = await productList.json();

    // Check if the response contains valid JSON data
    if (!val || !list) {
      throw new Error('Empty or invalid JSON data');
    }
    return { props: { val , list } };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return { props: { val: 100, list: [] } }; // Return default props or handle the error case appropriately
  }
}

export default Bicycle;
