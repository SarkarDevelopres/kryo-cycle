import { React, useEffect, useState } from 'react';
import styles from '../styles/componentCSS/cartCompo.module.css';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfirmToast } from 'react-confirm-toast'
function CartComponent({ cartId, id, quantity, ind }) {
    const router = useRouter();
    const [productDetails, setProductDetails] = useState({
        Name: "",
        Price: 0,
        Image: "../bicycle-1.jpg",
        ProductPoints: [1]
    });
    const [productQuantity, setProductQuantity] = useState(quantity);

    const fetchProductDetails = async (id) => {
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
        } catch (error) {
            console.error('Error fetching product details:', error);
            // Handle error state or display error message to the user
        }
    };

    const incrQnty = () => {
        if (productQuantity < productDetails.Quantity) {
            setProductQuantity(s => s + 1);
            if (document.getElementById(`updateQntyBtn${ind}`).style.display == '') {
                document.getElementById(`updateQntyBtn${ind}`).style.display = 'inline'
            }
        } else {
            toast.warn('You have selected the entire stock of the product!', {
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
    };

    const decrQnty = () => {
        if (productQuantity > 0) {
            setProductQuantity(s => s - 1);
            if (document.getElementById(`updateQntyBtn${ind}`).style.display == '') {
                document.getElementById(`updateQntyBtn${ind}`).style.display = 'inline'
            }
        }
    };

    const updateQnty = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/cart/updateCartQuantity`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ id: cartId, Quantity: productQuantity }),
            });
            if (!response.ok) {
                throw new Error('Failed to update quantity');
            }
            const res = await response.json();
            if(res.message=='Success'){
                location.reload();
            };

            document.getElementById(`updateQntyBtn${ind}`).style.display = '';
        } catch (error) {
            console.error('Error updating quantity:', error);
            // Handle error state or display error message to the user
        }
    };

    const deleteCartObj = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/cart/deleteItem`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify(cartId),
                });
                let res = await response.json();
                if(res.message=='Success'){
                    toast.success(`Item Deleted!!`, {
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
                };
                if (!response.ok) {
                    throw new Error('Failed to delete cart item');
                }
                // Add additional handling if needed
            } catch (error) {
                console.error('Error deleting cart item:', error);
                // Handle error state or display error message to the user
            }
    };
    const toPurchasePage = ()=>{
        let data = JSON.stringify({id:id,qnty:quantity});
        localStorage.setItem("productDetails",data);
        router.push(`${process.env.NEXT_PUBLIC_PORT}/purchasePage/cartItem`);
    }

    useEffect(() => {
        fetchProductDetails(id);
    }, [id]);

    return (
        <div className={styles.mainDiv}>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} theme="colored" />
            <div className={styles.productImage} style={{ backgroundImage: `url(${productDetails.Image})` }}></div>
            <div className={styles.productContent}>
                <span className={styles.productName}>{productDetails.Name}</span>
                <p>{productDetails.Description}</p>
                <div className={styles.dualDiv}>
                    <span className={styles.productPrice}>₹{productDetails.Price}</span>
                    <div>
                        <span className={styles.productQuantity}>Qty:{productQuantity}</span>
                        <button className={styles.addSubBtn} onClick={incrQnty}>+</button>
                        <button className={styles.addSubBtn} onClick={decrQnty}>-</button>
                        <button id={`updateQntyBtn${ind}`} className={styles.updateQnty} onClick={updateQnty}>Update</button>
                    </div>
                </div>
                <div className={styles.btnDiv}>
                    <button className={styles.buyNow} onClick={toPurchasePage}>Buy</button>
                    <ConfirmToast asModal={false}
                    customCancel={'Cancel'}
                    customConfirm={'Confirm'}
                    customFunction={deleteCartObj}
                    message={'Do you want to Delete the item?'}
                    position={'top-left'}
                    showCloseIcon={false}
                    theme={'light'}>
                    {<button className={styles.delete} >Delete</button>}
                    </ConfirmToast>
                </div>
            </div>
        </div>
    );
}

export default CartComponent;
