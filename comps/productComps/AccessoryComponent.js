import {React,useState,useEffect} from 'react'
import styles from '../../styles/componentCSS/productCompo.module.css'
function AccesoryComponent({id}) {
  const [productData, setProductData] = useState({Variants:[]});
  const fetchProductList = async (id) => {
    let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/product/singleProductDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(id),
    })
    let res = await a.json();
    setProductData({ ...res.data });
  }
  useEffect(() => {
    fetchProductList(id);
  }, [id]);
  return (
    <a href={`/products/${id}/`} className={styles.mainDiv}>
        <div className={styles.image} style={{backgroundImage:`url(${productData.Image})`}}></div>
        <div className={styles.productDetails}>
            <span className={styles.productCategorey}>{productData.Categorey}</span>
            <span className={styles.productName}>{productData.Name}</span>
            <span className={styles.productRatings}>{productData.Ratings}/5</span>
            <span className={styles.productPrice}>${productData.Price}</span>
        </div>
        <div className={styles.btns}>
            {
              productData.Variants.map((e,index)=>{
                return <button>{e.slice(0,1)}</button>
              })
            }
        </div>
    </a>
  )
}

export default AccesoryComponent