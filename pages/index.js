import styles from '../styles/Home.module.css';
import { FaBullseye } from "react-icons/fa";
import { GoPlay } from "react-icons/go";
import BikeComponent from '../comps/productComps/BikeComponent';
import AccessoryComponent from '../comps/productComps/AccessoryComponent';
import Navbar from '../comps/Navbar';
import Head from 'next/head'
import { useRouter } from 'next/router';
import Link from 'next/link';
import MTBContent from '../comps/MTBContent';
export default function Home({ arr, accessoryList }) {
  const router = useRouter();
  const toX26 = () => {
    router.push(`${process.env.NEXT_PUBLIC_PORT}/products/65d702726e71bafe2fa7886b`);
  }
  return (
    <>
      <Head>
        <title>Kryo Cycles</title>
      </Head>
      <section className={styles.main}>
        <Navbar color={"transparent"} page='h' />
        <div className={styles.bannerDiv}></div>
        <div className={styles.topDiv}>
          <div className={styles.openingLine}>
            <span>Newly Launched</span>
            <h1>Kryo X26 MTB</h1>
            <div className={styles.specification}>
              <p>Specifications:</p>
              <span><FaBullseye style={{ marginRight: 20, color: "rgb(224, 0, 0)" }} />Lightweight 18" Frame</span>
              <span><FaBullseye style={{ marginRight: 20, color: "rgb(224, 0, 0)" }} />Steel Suspension Fork</span>
              <span><FaBullseye style={{ marginRight: 20, color: "rgb(224, 0, 0)" }} />Steel Hardtail Frame</span>
            </div>
            <button className={styles.buyNowBtn} onClick={toX26}>Buy Now</button>
          </div>
        </div>
      </section>
      <section className={styles.newArrivals}>
        <div className={styles.nADiv}>
          <h1><span>New</span> <span>Arrivales</span></h1>
          <div className={styles.productList}>
            {arr.map((e) => {
              return <BikeComponent id={e} key={e} />
            })}
          </div>
        </div>
      </section>
      <section className={styles.discoverMTB}>
        <div className={styles.backgroundElement}>
          <MTBContent title={'Mountain Bikes'} />
        </div>
      </section>
      <section className={styles.discoverCTB}>
        <div className={styles.backgroundElement}>
          <MTBContent title={'City Bikes'} />
        </div>
      </section>
      <section className={styles.discoverSB}>
        <div className={styles.backgroundElement}>
          <MTBContent title={'Speciality Bikes'} />
        </div>
      </section>
      <section className={styles.whyChooseKyro}>
        <div className={styles.whyChooseKyroContent}>
          <h1>Why Choose KRYO?</h1>
          <div className={styles.wCKPics}>
            <div className={styles.wCKTwoPics}>
              <div className={styles.cardImages} style={{ backgroundImage: `url(../specification-1.jpg)` }}>
                <div className={styles.cardWithDesc}>
                  <h2>Light weight</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar.</p>
                </div>
              </div>
              <div className={styles.cardImages} style={{ backgroundImage: `url(../specification-2.jpg)` }}>
                <div className={styles.cardWithDesc}>
                  <h2>Lifetime Warrenty</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar.</p>
                </div>
              </div>
            </div>
            <div className={styles.wCKThreePics}>
              <div className={styles.cardImages} style={{ backgroundImage: `url(../specification-3.jpg)` }}>
                <div className={styles.cardWithNoDesc}>
                  <h2>Biggest Service Network</h2>
                </div>
              </div>
              <div className={styles.cardImages} style={{ backgroundImage: `url(../specification-4.jpg)` }}>
                <div className={styles.cardWithNoDesc}>
                  <h2>99% Assembled Delivery</h2>
                </div>
              </div>
              <div className={styles.cardImages} style={{ backgroundImage: `url(../specification-5.jpg)` }}>
                <div className={styles.cardWithNoDesc}>
                  <h2>Free First Bike Service</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.accessories}>
        <div className={styles.accessoriesContent}>
          <h1>Explore Accessories</h1>
          <div className={styles.productList}>
            {accessoryList.map((e, index) => {
              return <AccessoryComponent key={index} id={e._id} />
            })}
          </div>
          <div className={styles.accessoriesBtn}>
            <button>View All</button>
          </div>
        </div>
      </section>
      <section className={styles.bikingProgram}>
        <div className={styles.bikingProgramContent}>
          <h1>Join #GoEcoBiking Programme</h1>
          <div className={styles.bikingProgramBanner}>
            <div className={styles.bPMaskDiv}>
              <div className={styles.bPVideo}><GoPlay />Watch Full Video</div>
            </div>
          </div>
          <div className={styles.bikingProgramText}>
            <div className={styles.bikingProgramAbout}>
              <h2>Duis aute irure dolor in repreh enderit velit.</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
            </div>
            <div className={styles.bikingProgramBtn}><Link href='/contact'>Join The Programme</Link></div>
          </div>
        </div>
      </section>
      <section className={styles.buyNowX26}>
        <div className={styles.backgroundElement}>
          <div className={styles.buyNowX26Content}>
            <span>The All New</span>
            <h1>Kryo X26 MTB Is Here</h1>
            <p>Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo.</p>
            <button className={styles.buyNowBtn} onClick={toX26}>Buy Now</button>
          </div>
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps() {
  try {
    let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/product/productTimeList`);
    const productList = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/product/accessoryProductList`);
    let accessoryList = await productList.json();
    let res = await a.json();
    // console.log(res);
    let currentDate = new Date();
    let month = (currentDate.getMonth() + 1).toString();
    let year = currentDate.getFullYear().toString();
    if (month < 10) {
      month = '0' + month;
    }

    let currentMonthYear = month + year;
    // console.log("current:  "+currentMonthYear);
    let arr = [];
    for (let i = 0; i < res.length; i++) {
      let createdYear = res[i].createdAt.slice(0, 4);
      let createdMonth = res[i].createdAt.slice(5, 7);
      let createdMonthYear = createdMonth + createdYear;
      // console.log(createdMonthYear);
      if (createdMonthYear === currentMonthYear) {
        arr.push(res[i]._id);
        // console.log(res[i]._id);
      }
    }
    // console.log(arr);
    return { props: { arr, accessoryList } };
  } catch (error) {
    console.error('Error fetching product list:', error);
    return { props: { arr: [] } };
  }
}