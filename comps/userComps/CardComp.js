import { React, useState } from 'react'
import styles from '../../styles/componentCSS/address.module.css'
import { BsTrashFill } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfirmToast } from 'react-confirm-toast'
function CardComp({ no, id, userId, userName, bankName, cardNo, expDate, type, def }) {
    var style = { display: 'inline' };
    var defaultBtn = 'Set Default';
    const [card, setCard] = useState({
        userId: userId,
        CardNo: cardNo,
        UserName: userName,
        BankName: bankName,
        ExpiryDate: expDate,
        CardType: type,
        isDefault: def
    });
    var num = no + 1;
    if (def) {
        defaultBtn = 'is Default';
        style = { backgroundColor: 'rgb(65 108 76)' };
    }
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
    const updateCard = async () => {
        let prevCard = {
            userId: userId,
            CardNo: cardNo,
            UserName: userName,
            BankName: bankName,
            ExpiryDate: expDate,
            CardType: type,
            isDefault: def
        }
        if (JSON.stringify(prevCard) == JSON.stringify(card)) {
            toast.warn(`Change Details to Update!`, {
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
            let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/card/updateUserCard`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ id: id, card: card }),
            })
            let res = await a.json();
            if (res.message == 'Success') {
                toast.success('Successfully Updated!', {
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
            else {
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
        }
    }
    const deleteCard = async () => {
        let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/card/deleteUserCard`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ id: id, userId: userId }),
        })
        let res = await a.json();
        if (res.message == 'Success') {
            toast.success(`Successfully Deleted!!`, {
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
    }
    const setDefault = async () => {
        if (def != true) {
            let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/card/setDefaultUserCard`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ id: id, userId: userId, isDefault: true }),
            })
            let res = await a.json();
            if (res.message == 'Success') {
                toast.success('Successfully Updated!', {
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
        }
    }
    return (
        <div className={styles.billingAddress}>
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
            <h2>{'Card ' + num}</h2>
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
                <button className={styles.updateBtn} onClick={updateCard}>Update</button>
                <button style={style} className={styles.setDefaultBtn} onClick={setDefault}>{defaultBtn}</button>
                <ConfirmToast asModal={false}
                    customCancel={'Cancel'}
                    customConfirm={'Confirm'}
                    customFunction={deleteCard}
                    message={'Do you want to delete the Card?'}
                    position={'top-left'}
                    showCloseIcon={false}
                    theme={'light'}>
                    {<button className={styles.updateBtnTrash}><BsTrashFill /></button>}
                </ConfirmToast>
            </div>
        </div>
    )
}

export default CardComp