import {React , useState, useEffect} from 'react'
import Navbar from '../../../comps/Navbar'
import OrderComp from '../../../comps/userComps/OrderComp';
import SideBar from '../../../comps/userComps/SideBar'
import styles from '../../../styles/aboutU.module.css'
import jwt_decode from "jwt-decode";

function orders() {
    const [orderList, setorderList] = useState([]);
    const fetchOrderList = async(id)=>{
        let data = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/order/searchOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({id:id}),
        })
        let res = await data.json();
        setorderList(JSON.parse(JSON.stringify(res.data)));
    }
    useEffect(() => {
        var token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            fetchOrderList(decodedToken.id);
        }
    }, [])
    
  return (
    <div>
        <Navbar color='rgb(223 69 62)' page='abtUser'/>
        <div className={styles.allContent}>
            <SideBar page="order"/>
            <div className={styles.aboutUSection}>
                <h2>My Orders</h2>
                <div className={styles.orderList}>
                   {
                    orderList.map((e,index)=>{
                        return <OrderComp id={e.productId} qnty={e.Quantity} price={e.Price} key={index}/>
                    })
                   }
                </div>
            </div>
        </div>
    </div>
  )
}

export default orders