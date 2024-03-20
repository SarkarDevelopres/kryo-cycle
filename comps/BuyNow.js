import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import styles from '../styles/componentCSS/buyNow.module.css';
import { BsCartCheck } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BuyNow() {
    const [cartTotal, setcartTotal] = useState();
    const [productQntyList, setproductQntyList] = useState([]);
    const [userDetails, setUserDetails] = useState({
        FirstName: '',
        LastName:'',
        Phone: '',
        Email: ''
    });
    const router = useRouter();
    const fetchUserDetails = async(data)=>{
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/userDetailsFetch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({id:data}),
            });

            if (response.ok) {
                const responseData = await response.json();
                setUserDetails({...responseData.data})
            } else {
                throw new Error('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error:', error);
            throw error; // Rethrow the error to handle it higher up in your component hierarchy
        }
    } 
    const subTotal = async (a) => {
        const request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/cart/cartTotal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(a),
        });
        const res = await request.json();
        setcartTotal(res.sum);
        console.log(res.productList);
        setproductQntyList([...res.productList])
    }
    useEffect(() => {
        let productList = [];
        let cartObjs = JSON.parse(localStorage.getItem("cartItems"));
        // setCartitems(cartObjs);
        for (let i = 0; i < cartObjs.length; i++) {
            productList[i] = { id: cartObjs[i].productId, qnty: cartObjs[i].Quantity };
        }
        subTotal(productList);
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            fetchUserDetails(decodedToken.id);
        }
        initializeRazorpay();
    }, [])
    
    const makePayment = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            try {
                const res = await initializeRazorpay();
                if (!res) {
                    alert("Razorpay SDK Failed to load");
                    return;
                }

                const data = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/razorpay/order`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify({ prtAmount: cartTotal, prtQuantity: 1 })
                }).then((t) => t.json());

                const options = {
                    key: process.env.RAZORPAY_KEY,
                    name: "Kryo Cycles",
                    currency: data.currency,
                    amount: data.amount,
                    order_id: data.id,
                    description: "Enjoy your product!!",
                    image: 'https://scontent.fccu13-2.fna.fbcdn.net/v/t39.30808-6/433960377_314070231686489_4118192843236827368_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=eZpwmsn0nu8AX95g8Oc&_nc_ht=scontent.fccu13-2.fna&oh=00_AfADK90BSCc9C5M29Myi-xkYwsvqDHMOALZn3gHeBPcWvw&oe=65FFB15E',
                    handler: async function (response) {
                        const a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/razorpay/orderCartItem`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8',
                            },
                            body: JSON.stringify({
                                userId: decodedToken.id,
                                productQntyList: productQntyList,
                                paymentID: response.razorpay_payment_id,
                                orderID: data.id,
                                resOrderID: response.razorpay_order_id,
                                signature: response.razorpay_signature
                            })
                        });
                        const paymentStatus = await a.json();
                        if (paymentStatus.success) {
                            toast.success(`${paymentStatus.message}`, {
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
                            localStorage.removeItem("cartItems");
                            await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/cart/deleteByUserId`,{
                                method: 'POST',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8',
                            },
                            body: JSON.stringify(decodedToken.id)
                            })
                            location.href=`${process.env.NEXT_PUBLIC_PORT}/user`;
                        } else {
                            location.reload();
                        }
                    },
                    prefill: {
                        name: `${userDetails.FirstName+' '+userDetails.LastName}`,
                        Email: `${userDetails.Email}`,
                        contact: `${userDetails.Phone}`
                    },
                    theme: {
                        color: '#DF483E',
                        backdrop_color: '#ECF0F4'
                    }
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            } catch (error) {
                console.error('Error making payment:', error);
            }
        } else {
            toast.warn(`Login To purchase!`, {
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
            router.push(`${process.env.NEXT_PUBLIC_PORT}/login`);
        }
    };

    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };

    return (
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
            <button id='rzp-button1' onClick={makePayment}>CheckOut Cart <BsCartCheck size={30}/> </button>
        </div>
    );
}

export default BuyNow;
