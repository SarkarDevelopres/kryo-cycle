import { React, useEffect, useState } from 'react'
import styles from '../../styles/aboutU.module.css'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { HiPlus } from "react-icons/hi";
import DealerSideBar from '../../comps/specificComps/DealerSideBar';
import Head from 'next/head'
import AddProductComp from '../../comps/dealerComps/AddProductComp';
import jwt_decode from "jwt-decode";
import DealerProduct from '../../comps/dealerComps/DealerProduct';

function products() {
    const [show, setShow] = useState({ display: 'none' });
    const [decodedToken,setDecodedToken] = useState({});
    const [productList, setProductList] = useState([]);
    const showTab = () => {
        setShow({ display: 'block' });
    }
    const fetchProductList = async(id)=>{
        let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/dealer/dealerProductList`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(id),
        });
        let res = await a.json();
        setProductList(res.data);
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        let id = jwt_decode(token).id;
        fetchProductList(id);
        setDecodedToken(jwt_decode(token));
    }, [])
    
    return (
        <>
            <Head>
                <title>My Products</title>
            </Head>
            <div className={styles.allDealerContent}>
                <DealerSideBar page='prod' />
                <div className={styles.aboutUSection} style={{ minHeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h2 style={{ paddingBottom: '0px' }}>Products</h2>
                        <button className={styles.updateBtn} onClick={showTab}>Add <HiPlus style={{ fontSize: 30, fontWeight: '900' }} /></button>
                    </div>
                    <div className={styles.billingAddress} style={{ maxWidth: '100%', overflowY: 'auto', maxHeight: 400 }}>
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                            {productList.map((e,index)=>{
                                return <DealerProduct id={e} key={e}/>
                            })}
                        </div>
                            <div className={styles.innerDiv} style={show}>
                                <AddProductComp id={decodedToken.id}/>
                                <IoIosCloseCircleOutline style={{
                                    fontSize: '30px',
                                    position: 'absolute',
                                    top: '30px',
                                    right: '50px',
                                    cursor: 'pointer'
                                }} onClick={() => { setShow({ display: 'none' }) }} />
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default products

