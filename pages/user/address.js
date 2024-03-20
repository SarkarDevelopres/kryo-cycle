import { React, useEffect, useState } from 'react'
import Navbar from '../../comps/Navbar'
import styles from '../../styles/aboutU.module.css'
import jwt_decode from "jwt-decode";
import SideBar from '../../comps/userComps/SideBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddressComp from '../../comps/userComps/AddressComp';
import Head from 'next/head'
function address() {
    const [addresses, setAddresses] = useState([]);
    const [address, setAddress] = useState({
        userId: '',
        ResidentName: '',
        FlatHouseNumber: '',
        LaneNumber: '',
        Locality: '',
        City: '',
        State: '',
        PinCode: ''
    });
    const searchAddress = async (id) => {
        let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/address/searchAddress`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ id: id }),
        });
        let res = await a.json();
        if (res.data.length != 0) {
            setAddresses(JSON.parse(JSON.stringify(res.data)));
        } else {
            console.log(res.data);
        }
    }
    useEffect(() => {
        var token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            searchAddress(decodedToken.id);
        } else {

        }
    }, [])
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
    const addAddress = async () => {
       if (address.ResidentName==''||address.FlatHouseNumber==''||address.LaneNumber==''||address.Locality==''||address.City==''||address.PinCode==''||address.State=='') {
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
        let addressToBeSent = {
            userId: decodedToken.id,
            ResidentName: address.ResidentName,
            FlatHouseNumber: address.FlatHouseNumber,
            LaneNumber: address.LaneNumber,
            Locality: address.Locality,
            City: address.City,
            State: address.State,
            PinCode: address.PinCode
        }
        let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/address/addAddress`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(addressToBeSent),
        });
        let res = await a.json();
        if (res.message == "Success") {
            toast.success('Address successfully saved!', {
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
                <title>My Addresses</title>
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
                <SideBar page='address' />
                <div className={styles.aboutUSection}>
                    <h2>Addresses</h2>
                    <div className={styles.addressContent}>
                        {addresses.map((e, index) => {
                            return <AddressComp no={index} id={e._id} userId={e.userId} name={e.ResidentName} flatHouse={e.FlatHouseNumber} lane={e.LaneNumber} local={e.Locality} city={e.City} state={e.State} pin={e.PinCode} def={e.isDefault} />
                        })}
                    </div>
                    <div className={styles.billingAddress}>
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
                            <button className={styles.updateBtn} onClick={addAddress}>Add Address+</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default address