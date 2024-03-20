import { React, useEffect, useState } from 'react'
import styles from '../../styles/aboutU.module.css'
import jwt_decode from "jwt-decode";
import DealerSideBar from '../../comps/specificComps/DealerSideBar';
import Head from 'next/head'
import AddressComp from '../../comps/userComps/AddressComp';
function address() {
    const [headQuater, setHeadQuater] = useState({
        BuildingNo: '',
        RoadName: '',
        Locality: '',
        City: '',
        State: '',
        PinCode: '',
        Nation: ''
    });
    const searchAddress = async (id) => {
        let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/dealer/fetchAddress`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ id: id }),
        });
        let res = await a.json();
        setHeadQuater(JSON.parse(JSON.stringify(res.data)));
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
        if (e.target.name == 'buildingName') {
            setHeadQuater((s) => {
                return {
                    ...s, // Spread the existing object properties
                    BuildingNo: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
        if (e.target.name == 'roadName') {
            setHeadQuater((s) => {
                return {
                    ...s, // Spread the existing object properties
                    RoadName: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
        if (e.target.name == 'locality') {
            setHeadQuater((s) => {
                return {
                    ...s, // Spread the existing object properties
                    Locality: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
        if (e.target.name == 'city') {
            setHeadQuater((s) => {
                return {
                    ...s, // Spread the existing object properties
                    City: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
        if (e.target.name == 'state') {
            setHeadQuater((s) => {
                return {
                    ...s, // Spread the existing object properties
                    State: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
        if (e.target.name == 'pinCode') {
            setHeadQuater((s) => {
                return {
                    ...s, // Spread the existing object properties
                    PinCode: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
        if (e.target.name == 'nation') {
            setHeadQuater((s) => {
                return {
                    ...s, // Spread the existing object properties
                    Nation: e.target.value // Update the 'FlatHouseNumber' property
                };
            });
        }
    }
    const addAddress = async () => {
        var token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        let headQuaterToBeSent = {
            BuildingNo: headQuater.BuildingNo,
            RoadName: headQuater.RoadName,
            Locality: headQuater.Locality,
            City: headQuater.City,
            State: headQuater.State,
            PinCode: headQuater.PinCode,
            Nation: headQuater.Nation
        }
        let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/dealer/addAddress`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({id:decodedToken.id,address:headQuaterToBeSent}),
        });
        let res = await a.json();
        if (res.message == "Success") {
            alert("Address successfully saved!");
            location.reload();
        }
    }
    return (
        <>
            <Head>
                <title>My Addresses</title>
            </Head>
            <div className={styles.allDealerContent}>
                <DealerSideBar page='add' />
                <div className={styles.aboutUSection}>
                    <h2>Address</h2>
                    <div className={styles.billingAddress}>
                        <div className={styles.billingAddressDetails}>
                            <input type='text' name='buildingName' placeholder="Building's Name" value={headQuater.BuildingNo} onChange={handleAddressChange} />
                            <div className={styles.dualInputs}>
                                <input type='text' name='roadName' placeholder='Road Name' value={headQuater.RoadName} onChange={handleAddressChange} />
                                <input type='text' name='locality' placeholder='Locality' value={headQuater.Locality} onChange={handleAddressChange} />
                            </div>
                            <div className={styles.dualInputs}>
                                <input type='text' name='city' placeholder='City Name' value={headQuater.City} onChange={handleAddressChange} />
                                <input type='text' name='state' placeholder='State Name' value={headQuater.State} onChange={handleAddressChange} />
                            </div>
                            <div className={styles.dualInputs}>
                                <input type='text' name='pinCode' placeholder='Pincode' value={headQuater.PinCode} onChange={handleAddressChange} />
                                <input type='text' name='nation' placeholder='Nation' value={headQuater.Nation} onChange={handleAddressChange} />
                            </div>
                        </div>
                        <div className={styles.btnS}>
                            <button className={styles.updateBtn} onClick={addAddress}>Add Address</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default address