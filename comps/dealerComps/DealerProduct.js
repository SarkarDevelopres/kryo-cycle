import { React, useEffect, useState } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from '../../styles/componentCSS/dealerProduct.module.css'
import UpdateProductComp from './UpdateProductComp';
function DealerProduct({ id }) {
  const [data, setData] = useState({ ProductPoints: [], DescriptionTags:[] })
  const [style, setStyle] = useState({ display: 'none' });
  const fetchProductDetails = async () => {
    let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/product/singleProductDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(id),
    });
    let res = await a.json();
    setData({...res.data})
  }
  // id={decodedToken.id}
  fetchProductDetails();
  const deleteProduct = async ()=>{
    if (confirm('Sure you want to Delete the product?')) {
      let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/product/deleteProduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(id),
      });
      let res = await a.json();
      if (res.message=="Success") {
        alert("Product Successfully Deleted!");
        location.reload();
      } else {
        alert("Some Error Occured Please Try Again !!");
      }
    }
  }
   return (
    <div className={styles.mainDiv}>
      <div className={styles.addProductTab} style={style}>
        <div className={styles.innerDiv}>
          <UpdateProductComp id={id} />
          <IoIosCloseCircleOutline style={{
            fontSize: '30px',
            position: 'absolute',
            top: '5px',
            right: '10px',
            cursor: 'pointer'
          }} onClick={() => { setStyle({ display: 'none' }) }} />
        </div>
      </div>
      <img className={styles.pic} src={data.Image} />
      <div style={{ paddingLeft: '20px' }}>
        <h1 style={{ margin: '0px 0px 6px 0px' }}>{data.Name}</h1>
        <div className={styles.keyValueDiv}><span>Price: </span><span className={styles.value}>₹{data.Price}</span></div>
        <div className={styles.keyValueDiv}><span>Quantity: </span><span className={styles.value}>{data.Quantity}</span></div>
        <div className={styles.keyValueDiv}><span>Desc: </span><span className={styles.value}>{data.Description}</span></div>
        <div className={styles.keyValueDiv}><span>Desc Tags: </span>{
          data.DescriptionTags.map((e)=>{
            return <span className={styles.value}>{e}, </span>
          })
        }</div>
        <div className={styles.keyValueDiv}>
          <span>Points: </span>
          <ul className={styles.value} style={{ margin: '5px 0px', paddingLeft: '20px' }}>
            {data.ProductPoints.map((e) => {
              return <li>{e}</li>
            })}
          </ul>
        </div>
        <div className={styles.btns}>
          <button className={styles.updateBtn} onClick={()=>setStyle({display:'block'})}>Update</button>
          <button className={styles.deleteBtn} onClick={deleteProduct}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DealerProduct