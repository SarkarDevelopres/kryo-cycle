import { React, useState } from 'react'
import styles from '../../styles/componentCSS/address.module.css'
import { BsTrashFill } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfirmToast } from 'react-confirm-toast'
function AddressComp({ no, id, userId, name, flatHouse, lane, local, city, state, pin, def, }) {
    var style = { display: 'inline' };
    var defaultBtn = 'Set Default';
    const [address, setAddress] = useState({
        userId: userId,
        ResidentName: name,
        FlatHouseNumber: flatHouse,
        LaneNumber: lane,
        Locality: local,
        City: city,
        State: state,
        PinCode: pin,
        isDefault: def
    });
    var num = no + 1;
    if (def) {
        defaultBtn = 'is Default';
        style = { backgroundColor: 'rgb(65 108 76)' };
    }
    const handleAddressChange = (e) => {
        if (e.target.name == 'residentName') {
            setAddress((s) => {
                return {
                    ...s, // Spread the existing object properties
                    ResidentName: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
        if (e.target.name == 'flatHouseNo') {
            setAddress((s) => {
                return {
                    ...s, // Spread the existing object properties
                    FlatHouseNumber: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
        if (e.target.name == 'laneNo') {
            setAddress((s) => {
                return {
                    ...s, // Spread the existing object properties
                    LaneNumber: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
        if (e.target.name == 'locality') {
            setAddress((s) => {
                return {
                    ...s, // Spread the existing object properties
                    Locality: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
        if (e.target.name == 'city') {
            setAddress((s) => {
                return {
                    ...s, // Spread the existing object properties
                    City: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
        if (e.target.name == 'state') {
            setAddress((s) => {
                return {
                    ...s, // Spread the existing object properties
                    State: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
        if (e.target.name == 'pinCode') {
            setAddress((s) => {
                return {
                    ...s, // Spread the existing object properties
                    PinCode: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
    }
    const updateAddress = async () => {
        let prevAddress = {
            userId: userId,
            ResidentName: name,
            FlatHouseNumber: flatHouse,
            LaneNumber: lane,
            Locality: local,
            City: city,
            State: state,
            PinCode: pin,
            isDefault: def
        }
        if (JSON.stringify(prevAddress) == JSON.stringify(address)) {
            toast.warn(`Change Address to Update!`, {
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
            let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/address/updateUserAddress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ id: id, address: address }),
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
    const deleteAddress = async () => {
        let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/address/deleteUserAddress`, {
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
            let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/address/setDefaultUserAddress`, {
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

            <h2>{'Address ' + num}</h2>
            <div className={styles.billingAddressDetails}>
                <input type='text' name='residentName' placeholder="Resident's Name" value={address.ResidentName} onChange={handleAddressChange} />
                <input type='text' name='flatHouseNo' placeholder='Flat/House No.' value={address.FlatHouseNumber} onChange={handleAddressChange} />
                <input type='text' name='laneNo' placeholder='Lane Address' value={address.LaneNumber} onChange={handleAddressChange} />
                <div className={styles.dualInputs}>
                    <input type='text' name='locality' placeholder='Locality' value={address.Locality} onChange={handleAddressChange} />
                    <input type='text' name='city' placeholder='City Name' value={address.City} onChange={handleAddressChange} />
                </div>
                <div className={styles.dualInputs}>
                    <input type='text' name='state' placeholder='State Name' value={address.State} onChange={handleAddressChange} />
                    <input type='text' name='pinCode' placeholder='Pincode' value={address.PinCode} onChange={handleAddressChange} />
                </div>
            </div>
            <div className={styles.btnS}>
                <button className={styles.updateBtn} onClick={updateAddress}>Update</button>
                <button style={style} className={styles.setDefaultBtn} onClick={setDefault}>{defaultBtn}</button>
                <ConfirmToast asModal={false}
                    customCancel={'Cancel'}
                    customConfirm={'Confirm'}
                    customFunction={deleteAddress}
                    message={'Do you want to delete the address?'}
                    position={'top-left'}
                    showCloseIcon={false}
                    theme={'light'}>
                    {<button className={styles.updateBtnTrash}><BsTrashFill /></button>}
                </ConfirmToast>

            </div>
        </div>
    )
}

export default AddressComp