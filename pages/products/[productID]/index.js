import { useState, useEffect } from 'react';
import Navbar from '../../../comps/Navbar';
import { useRouter } from 'next/router';
import Head from 'next/head';
import jwt_decode from "jwt-decode";
import styles from '../../../styles/product.module.css';
import { IoStar, IoStarOutline } from "react-icons/io5";
import ReviewComponent from '../../../comps/specificComps/ReviewComponent';
import BikeComponent from '../../../comps/productComps/BikeComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductPage() {
    const router = useRouter();
    const [id, setId] = useState('');
    const [productData, setProductData] = useState({ ProductPoints: [] });
    const [relatedProductIDs, setRelatedProductIDs] = useState([]);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const fetchSingleProductDetails = async (id) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/product/singleProductDetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(id),
            });
            const res = await response.json();
            setDiscountedPrice((res.data.Price * res.data.Discount) / 100);
            setProductData({ ...res.data });
            const response2 = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/product/relatedProductIDs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ id: id, categorey: res.data.Categorey }),
            });
            const res2 = await response2.json();
            setRelatedProductIDs([...res2]);
        } catch (error) {
            console.error('Error fetching product details:', error.message);
        }
    };

    useEffect(() => {
        if (!router.isReady) return;
        const iD = router.query.productID;
        setId(iD);
        fetchSingleProductDetails(iD);
    }, [router.isReady]);

    const handleQuantity = (e) => {
        setQuantity(e.target.value);
    };

    const addCart = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            const currentTimeMilliseconds = (new Date().getTime()) / 1000;
            const time = parseInt(currentTimeMilliseconds);
            if (time > decodedToken.exp) {
                toast.error(`Session Expired!!`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    // transition: Bounce,
                });
                localStorage.removeItem('token');
                location.reload();
            } else {
                if (decodedToken.categorey == 'user') {
                    if (quantity > 0 && quantity <= 100) {
                        try {
                            const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/cart/addProduct`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8',
                                },
                                body: JSON.stringify({ userId: decodedToken.id, productId: router.query.productID, Quantity: quantity }),
                            });
                            const res = await response.json();
                            if (res.message == 'Success') {
                                toast.success(`Added to Cart`, {
                                    position: "top-right",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "colored",
                                    // transition: Bounce,
                                });
                                location.reload();
                            } else {
                                toast.error(`${res.message}`, {
                                    position: "top-right",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "colored",
                                    // transition: Bounce,
                                });
                            }
                        } catch (error) {
                            console.error('Error adding product to cart:', error.message);
                        }
                    } else {
                        toast.error(`Can't add ${quantity} item to cart!`, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                            // transition: Bounce,
                        });
                        setQuantity(1);
                    }
                } else {
                    toast.error(`Invalid Access!!`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        // transition: Bounce,
                    });
                    router.push(`${process.env.NEXT_PUBLIC_PORT}/dealerPortal`);
                }
            }
        } else {
            toast.warn(`Login to Add items to cart!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                // transition: Bounce,
            });
        }
    };
    const toPurchasePage = () => {
        let data = JSON.stringify({ id: id, qnty: quantity });
        localStorage.setItem("productDetails", data);
        router.push(`${process.env.NEXT_PUBLIC_PORT}/purchasePage`);
    }
    return (
        <div>
            <Head>
                <title>Bicycles</title>
            </Head>
            <Navbar color={"rgb(223 69 62)"} />
            <div className={styles.mainDiv}>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                    theme="colored"
                />
                <div className={styles.productAllData}>
                    <div className={styles.productContent}>
                        <div className={styles.productImage} style={{ backgroundImage: `url(${productData.Image})` }}></div>
                        <div className={styles.productDetails}>
                            <span className={styles.productCategory}>
                                {Array.from({ length: productData.Rating }).map((_, index) => (
                                    <IoStar key={index} />
                                ))}
                            </span>
                            <span className={styles.productCategory}>
                                {Array.from({ length: 5 - productData.Rating }).map((_, index) => (
                                    <IoStarOutline key={index} />
                                ))}
                            </span>
                            <h2 className={styles.productName}>{productData.Name}</h2>
                            <div className={styles.priceDiv}>
                                <p className={styles.productPrevPrice}>₹{productData.Price}</p>
                                <p className={styles.productPrice}>₹{productData.Price - discountedPrice}</p>
                                <p className={styles.discountAmount}><span>{productData.Discount}</span>% off</p>
                            </div>
                            <p className={styles.productDescription}>{productData.Description}</p>
                            <span className={styles.Points}>Features:</span>
                            <ul className={styles.productPointsList}>
                                {productData.ProductPoints.map((e, index) => (
                                    <li key={index}>{e}</li>
                                ))}
                            </ul>
                            <div className={styles.buyBtn}>
                                <input type='number' value={quantity} onChange={handleQuantity} />
                                <button className={styles.addCart} onClick={(e) => addCart(e)}>Add to Cart</button>
                                <button className={styles.buyNow} onClick={toPurchasePage}>Buy Now</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.lineDiv}></div>
                    <div className={styles.reviews}>
                        <span className={styles.reviewHead}>{"Reviews (1)"}</span>
                        <div className={styles.reviewList}>
                            <ReviewComponent />
                        </div>
                    </div>
                    <div className={styles.relatedProducts}>
                        <h2>Related Products</h2>
                        <div className={styles.relatedProductList}>
                            {relatedProductIDs.map((e, index) => (
                                <BikeComponent id={e._id} key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
