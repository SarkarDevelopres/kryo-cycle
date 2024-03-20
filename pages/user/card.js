import { React, useEffect, useState } from 'react'
import Navbar from '../../comps/Navbar'
import styles from '../../styles/aboutU.module.css'
import jwt_decode from "jwt-decode";
import SideBar from '../../comps/userComps/SideBar';
import CardComp from '../../comps/userComps/CardComp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'
function card() {
    const [cards, setCards] = useState([]);
    const [card, setCard] = useState({
        userId: '',
        CardNo: '',
        UserName: '',
        BankName: '',
        ExpiryDate: '',
        CardType: '',
        isDefault: ''
    });
    const searchCard = async (id) => {
        let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/card/searchCard`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ id: id }),
        });
        let res = await a.json();
        if (res.data.length != 0) {
            setCards(JSON.parse(JSON.stringify(res.data)));
        } else {
            console.log(res.data);
        }
    }
    useEffect(() => {
        var token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            searchCard(decodedToken.id);
        } else {

        }
    }, [])
    const handleCardChange = (e) => {
        if (e.target.name == 'cardNo') {
            setCard((s) => {
                return {
                    ...s, // Spread the existing object properties
                    CardNo: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
        if (e.target.name == 'userName') {
            setCard((s) => {
                return {
                    ...s, // Spread the existing object properties
                    UserName: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
        if (e.target.name == 'expDate') {
            setCard((s) => {
                return {
                    ...s, // Spread the existing object properties
                    ExpiryDate: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
        if (e.target.name == 'type') {
            setCard((s) => {
                return {
                    ...s, // Spread the existing object properties
                    CardType: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
        if (e.target.name == 'bankName') {
            setCard((s) => {
                return {
                    ...s, // Spread the existing object properties
                    BankName: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
    }
    const addCard = async () => {
        if (card.CardNo==''||card.CardType==''||card.BankName==''||card.ExpiryDate==''||card.UserName=='') {
            toast.warn('Fill All Fields!!', {
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
        } else {
            var token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        let cardToBeSent = {
            userId: decodedToken.id,
            CardNo: card.CardNo,
            UserName: card.UserName,
            BankName: card.BankName,
            ExpiryDate: card.ExpiryDate,
            CardType: card.CardType,
            isDefault: card.isDefault
        }
        let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/card/addCard`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(cardToBeSent),
        });
        let res = await a.json();
        if (res.message == "Success") {
            toast.success('Card successfully saved!', {
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
        }
    }
    return (
        <>
            <Head>
                <title>My Cards</title>
            </Head>
            <Navbar color='rgb(223 69 62)' page='abtUser' />
            <div className={styles.allContent}>
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
                <SideBar page='card' />
                <div className={styles.aboutUSection}>
                    <h2>Cards</h2>
                    <div className={styles.addressContent}>
                        {cards.map((e, index) => {
                            return <CardComp no={index} id={e._id} userId={e.userId} userName={e.UserName} bankName={e.BankName} cardNo={e.CardNo} expDate={e.ExpiryDate} type={e.CardType} def={e.isDefault} />
                        })}
                    </div>
                    <div className={styles.billingAddress}>
                        <div className={styles.billingAddressDetails}>
                            <input type='number' name='cardNo' placeholder="Card Number" value={card.CardNo} onChange={handleCardChange} />
                            <div className={styles.dualInputs}>
                                <input type='text' name='userName' placeholder='Acc. Holder Name' value={card.UserName} onChange={handleCardChange} />
                                <input type='text' name='bankName' placeholder='Bank Name' value={card.BankName} onChange={handleCardChange} />
                            </div>
                            <div className={styles.dualInputs}>
                                <input type='text' name='expDate' placeholder='Expiry Date' value={card.ExpiryDate} onChange={handleCardChange} />
                                <input type='text' name='type' placeholder='Card Type' value={card.CardType} onChange={handleCardChange} />
                            </div>
                        </div>
                        <div className={styles.btnS}>
                            <button className={styles.updateBtn} onClick={addCard}>Add Card+</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default card