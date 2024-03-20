import { React, useState } from 'react'
import styles from '../../styles/componentCSS/address.module.css'
import { BsTrashFill } from "react-icons/bs";
function UPIComp({ no, id, userId, upiNo, phnNo, def }){
    var style = { display: 'inline' };
    var defaultBtn = 'Set Default';
    const [upi, setUPI] = useState({
        userId: userId,
        UPINo: upiNo,
        PhoneNo: phnNo,
        isDefault:def
    });
    var num = no + 1;
    if (def) {
        defaultBtn = 'is Default';
        style = { backgroundColor: 'rgb(65 108 76)' };
    }
    const handleUPIChange = (e) => {
        if (e.target.name == 'upiNo') {
            setUPI((s) => {
                return {
                    ...s, // Spread the existing object properties
                    UPINo: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
        if (e.target.name == 'phnNo') {
            setUPI((s) => {
                return {
                    ...s, // Spread the existing object properties
                    PhoneNo: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
    }
    const updateUPI = async () => {
        let prevUPI = {
            userId: userId,
            UPINo: upiNo,
            PhoneNo:phnNo,
            isDefault: def
        }
        if (JSON.stringify(prevUPI) == JSON.stringify(upi)) {
            alert("Change UPI to Update!")
        } else {
            let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/upi/updateUserUPI`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ id: id, upi: upi }),
            })
            let res = await a.json();
            alert(res.message);
            location.reload();
        }
    }
    const deleteUPI = async () => {
        if (confirm('Are you sure you want to Delete?')) {
            let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/upi/deleteUserUPI`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ id: id, userId: userId }),
            })
            let res = await a.json();
            alert(res.message);
            location.reload();
        }
    }
    const setDefault = async () => {
        if (def != true) {
            let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/upi/setDefaultUserUPI`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ id: id, userId: userId, isDefault: true }),
            })
            let res = await a.json();
            alert(res.message);
            location.reload();
        }
    }
    return (
        <div className={styles.billingAddress}>
            <h2>{'UPI ' + num}</h2>
            <div className={styles.billingAddressDetails}>
                            <input type='text' name='upiNo' placeholder="UPI Number" value={upi.UPINo} onChange={handleUPIChange} />
                            <input type='number' name='phnNo' placeholder="Phone Number" value={upi.PhoneNo} onChange={handleUPIChange} />
                        </div>
            <div className={styles.btnS}>
                <button className={styles.updateBtn} onClick={updateUPI}>Update</button>
                <button style={style} className={styles.setDefaultBtn} onClick={setDefault}>{defaultBtn}</button>
                <button className={styles.updateBtnTrash} onClick={deleteUPI}><BsTrashFill /></button>
            </div>
        </div>
    )
}

export default UPIComp