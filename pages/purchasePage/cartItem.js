import { useRouter } from 'next/router';
import { React, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode';
import PurchaseProduct from '../../comps/PurchaseProduct';
import styles from '../../styles/purchasePage.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function cartItem() {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [productDetails, setProductDetails] = useState({});
    const [userDetails, setUserDetails] = useState({
        FirstName: '',
        LastName: '',
        Phone: '',
        Email: ''
    });
    const loadDetails = (e) => {
        if (e.target.name == 'FirstName') {
            setUserDetails((s) => { return { ...s, FirstName: e.target.value } });
        }
        if (e.target.name == 'LastName') {
            setUserDetails((s) => { return { ...s, LastName: e.target.value } });
        }
        if (e.target.name == 'Phone') {
            setUserDetails((s) => { return { ...s, Phone: e.target.value } });
        }
        if (e.target.name == 'Email') {
            setUserDetails((s) => { return { ...s, Email: e.target.value } });
        }
    }
    const fetchproductDetails = async (id) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/product/singleProductDetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(id),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch product details');
            }
            const data = await response.json();
            setProductDetails({ ...data.data });
            // console.log(data.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
            // Handle error state or display error message to the user
        }
    }
    const fetchUserDetails = async (data) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/userDetailsFetch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ id: data }),
            });

            if (response.ok) {
                const responseData = await response.json();
                setUserDetails({ ...responseData.data })
            } else {
                throw new Error('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error:', error);
            throw error; // Rethrow the error to handle it higher up in your component hierarchy
        }
    }
    const findIndex = async (array, id) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i].productId == id) {
                return i;
            }
        }
    }
    const makePayment = async () => {
        if (userDetails.FirstName == '' || userDetails.LastName == '' || userDetails.Phone == '' || userDetails.Email == '') {
            toast.warn('Fill Your Details!!', {
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
        else {
            const token = localStorage.getItem('token');
            const decodedToken = jwt_decode(token);
            const data = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/razorpay/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ prtAmount: productDetails.Price, prtQuantity: quantity })
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
                    const a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/razorpay/orderItem`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                        },
                        body: JSON.stringify({
                            userId: decodedToken.id,
                            productId: productDetails._id,
                            Quantity: data.quantity,
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
                        let cartItems = JSON.parse(localStorage.getItem("cartItems")); // Parse the string into an array
                        let index = await findIndex(cartItems,productDetails._id); // No need for await as findIndex is synchronous
                        if (index !== -1) { // Check if the item was found
                            cartItems.splice(index, 1); // Remove the item from the array
                            localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Store the updated array back to localStorage
                        }
                        localStorage.removeItem("productDetails");
                        await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/cart/deleteByProductId`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8',
                            },
                            body: JSON.stringify(productDetails._id)
                        })
                        router.push(`${process.env.NEXT_PUBLIC_PORT}/user`)
                    } else {
                        toast.error(`${paymentStatus.message}`, {
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
                    }
                },
                prefill: {
                    name: `${userDetails.FirstName + ' ' + userDetails.LastName}`,
                    Email: `${userDetails.Email}`,
                    contact: `${userDetails.Phone}`
                },
                theme: {
                    color: '#DF483E',
                    backdrop_color: '#000000'
                }
            };
            // ECF0F4
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        }
    }
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
    useEffect(() => {
        let productDetails = JSON.parse(localStorage.getItem("productDetails"));
        setQuantity(productDetails.qnty);
        fetchproductDetails(productDetails.id);
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        fetchUserDetails(decodedToken.id);
        initializeRazorpay();
    }, []);
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
            <div className={styles.content}>
                <div className={styles.productsListTotal}>
                    <div className={styles.productList}>
                        <PurchaseProduct name={productDetails.Name} quantity={quantity} price={productDetails.Price} image={productDetails.Image} />
                    </div>
                    <div className={styles.subTotal}>
                        Sub-Total:
                        <span>₹{(productDetails.Price) * quantity}</span>
                    </div>
                </div>
                <div className={styles.formBody}>
                    <h2>Kryo Cycles</h2>
                    <input type='text' name='FirstName' value={userDetails.FirstName} placeholder='First Name' onChange={loadDetails} />
                    <input type='text' name='LastName' value={userDetails.LastName} placeholder='Last Name' onChange={loadDetails} />
                    <input type='number' name='Phone' value={userDetails.Phone} placeholder='Phone' onChange={loadDetails} />
                    <input type='email' name='Email' value={userDetails.Email} placeholder='Email' onChange={loadDetails} />
                    <button onClick={makePayment}>Pay Now</button>
                </div>
            </div>
        </div>
    )
}

export default cartItem