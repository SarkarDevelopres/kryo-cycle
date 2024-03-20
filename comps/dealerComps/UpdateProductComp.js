import { React, useEffect, useState } from 'react'
import styles from '../../styles/componentCSS/addProductComp.module.css'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { HiPlus, HiTrash } from "react-icons/hi";
function UpdateProductComp({ id }) {
    const [data, setData] = useState({
        Name: '',
        Price: '',
        Discount: '',
        Quantity: '',
        Categorey: 'Bicycle',
        Description: '',
        DescriptionTags: [],
        PaymentMethods: []
    })
    const [productPoints, setProductPoints] = useState([]);
    const [descriptionTags, setDescriptionTags] = useState([]);
    const [mainImg, setMainImg] = useState("../add_product.jpg");
    const fetchProductDetails = async () => {
        let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/product/singleProductDetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(id),
        });
        let res = await a.json();
        setProductPoints(res.data.ProductPoints)
        setDescriptionTags(res.data.DescriptionTags)
        setMainImg(res.data.Image)
        delete res.data.ProductPoints
        delete res.data.DescriptionTags
        delete res.data.Image
        if (res.data.PaymentMethods[0] == 'cash') {
            document.getElementById('cashed').style.backgroundColor = 'black';
            if (res.data.PaymentMethods[1] == 'online') {
                document.getElementById('onlined').style.backgroundColor = 'black';
            }
        }
        else {
            document.getElementById('onlined').style.backgroundColor = 'black';
            if (data.PaymentMethods[1] == 'cash') {
                document.getElementById('cashed').style.backgroundColor = 'black';
            }
        }
        setData({ ...res.data })
    }
    const loadImage = async (e) => {
        if (e.target.name == 'Img') {
            const file = e.target.files[0];
            const base64 = await convertToBase64(file);
            console.log(base64);
            setMainImg(`${base64}`);
        }
    }
    useEffect(() => {
        fetchProductDetails();
        // if (data.PaymentMethods[0]=='cash') {
        //     document.getElementById('cashed').style.backgroundColor = 'black';
        //     if (data.PaymentMethods[1]=='online') {
        //         document.getElementById('onlined').style.backgroundColor = 'black';
        //     }
        // } else {
        //     document.getElementById('onlined').style.backgroundColor = 'black';
        //     if (data.PaymentMethods[1]=='cash') {
        //         document.getElementById('cashed').style.backgroundColor = 'black';
        //     }
        // }    
    }, [])

    const handleChange = (e) => {
        if (e.target.name == 'name') {
            setData((prevState) => ({
                ...prevState,
                Name: e.target.value
            }));
        }
        if (e.target.name == 'categorey') {
            setData((prevState) => ({
                ...prevState,
                Categorey: e.target.value
            }));
        }
        if (e.target.name == 'quantity') {
            setData((prevState) => ({
                ...prevState,
                Quantity: e.target.value
            }));
        }
        if (e.target.name == 'price') {
            setData((prevState) => ({
                ...prevState,
                Price: e.target.value
            }));
        }
        if (e.target.name == 'discount') {
            setData((prevState) => ({
                ...prevState,
                Discount: e.target.value
            }));
        }
        if (e.target.name == 'description') {
            setData((prevState) => ({
                ...prevState,
                Description: e.target.value
            }));
        }
    }
    const handlePoints = (e) => {
        for (let i = 0; i < productPoints.length; i++) {
            if (e.target.name === `productPoints${i}`) {
                setProductPoints(s => [...s.slice(0, i), e.target.value, ...s.slice(i + 1)]);
            }
        }
    }
    const addProductPoints = () => {
        console.log("added");
        setProductPoints((pS) => ([
            ...pS, ""
        ]))
    }
    const deletePoint = (e, index) => {
        setProductPoints((s) => (s.slice(0, index)).concat(s.slice(index + 1, s.length)));
    }
    const handleTags = (e) => {
        for (let i = 0; i < descriptionTags.length; i++) {
            if (e.target.name === `descriptionTags${i}`) {
                setDescriptionTags(s => [...s.slice(0, i), e.target.value, ...s.slice(i + 1)]);
            }
        }
    }
    const addDescriptionTags = () => {
        setDescriptionTags((pS) => ([
            ...pS, ""
        ]))
    }
    const deleteTags = (e, index) => {
        setDescriptionTags((s) => (s.slice(0, index)).concat(s.slice(index + 1, s.length)));
    }
    const managePaymentOptions = (e) => {
        if (e.target.id == "cashed") {
            if (data.PaymentMethods.includes("cashed")) {
                document.getElementById('cashed').style.backgroundColor = 'red';
                document.getElementById('onlined').style.backgroundColor = 'black';
                setData((prevState) => ({
                    ...prevState,
                    PaymentMethods: ["online"]
                }));
            } else {
                document.getElementById('cashed').style.backgroundColor = 'black';
                setData((prevState) => ({
                    ...prevState,
                    PaymentMethods: [...data.PaymentMethods, "cash"]
                }));
            }
        } else {
            if (data.PaymentMethods.includes("online")) {
                document.getElementById('onlined').style.backgroundColor = 'red';
                document.getElementById('cashed').style.backgroundColor = 'black';
                setData((prevState) => ({
                    ...prevState,
                    PaymentMethods: ["cash"]
                }));
            } else {
                document.getElementById('onlined').style.backgroundColor = 'black';
                setData((prevState) => ({
                    ...prevState,
                    PaymentMethods: [...data.PaymentMethods, "online"]
                }));
            }
        }
    }
    const updateProduct = async () => {
        let finalData = {
            dealerId: data.dealerId,
            Name: data.Name,
            Image: mainImg,
            Price: data.Price,
            Discount: data.Discount,
            Quantity: data.Quantity,
            Description: data.Description,
            ProductPoints: productPoints,
            Categorey: data.Categorey,
            PaymentMethods: data.PaymentMethods
        }
        let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/product/updateProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ data: finalData, id: id }),
        });
        let r = await a.json();
        if (r.message == 'Success') {
            alert("Product Updated Succesfully!");
            location.reload();
        }
        else {
            alert("Some Error Occured Please Try Again !!");
        }
    }
    const resetDetails = () => {
        fetchProductDetails();
    }
    return (
        <div className={styles.mainDiv}>
            <div className={styles.topDiv}>
                <label htmlFor='Img' style={{ cursor: 'pointer' }}><img src={mainImg} width={200} /></label>
                <input style={{ display: 'none' }} id='Img' name='Img' type='file' onChange={(e) => loadImage(e)} />
                <div className={styles.productFormOne}>
                    <div className={styles.inputTags}>
                        <span>Name</span>
                        <input type='text' name='name' value={data.Name} onChange={(e) => handleChange(e)} />
                    </div>

                    <div className={styles.inputTags}>
                        <span>Quantity</span>
                        <input type='number' name='quantity' value={data.Quantity} onChange={(e) => handleChange(e)} />
                    </div>
                    <div className={styles.dualInputs}>
                        <div className={styles.inputTags}>
                            <span>Price</span>
                            <input type='number' name='price' value={data.Price} onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.inputTags}>
                            <span>Discount %</span>
                            <input type='number' name='discount' value={data.Discount} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.lowerDiv}>
                <div className={styles.inputTags}>
                    <span>Description</span>
                    <input type='text' name='description' value={data.Description} onChange={(e) => handleChange(e)} />
                </div>
                <div className={styles.inputTags} >
                    <span>Decription Tags</span>
                    <div style={{ display: 'flex' }}>
                        <div className={styles.descTagsBtnDiv}>
                            <button className={styles.addTagBtn} onClick={addDescriptionTags}>Edit Tags</button>
                        </div>
                        <div className={styles.descTagsDiv}>
                            {
                                descriptionTags.map((singleTag, index) => {
                                    return <div key={index} className={styles.updtDescOneTagDiv}>
                                        <input type='text' name={`descriptionTags${index}`} value={descriptionTags[index]} onChange={(e)=> handleTags(e)} ></input>
                                        <button onClick={(e)=>deleteTags(e,index)}><HiTrash /></button>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.inputTags}>
                    <button className={styles.addProductPointBtn} onClick={addProductPoints}><HiPlus />Add Product Points</button>
                    <div className={styles.allProductPoints} style={{ marginTop: 10 }}>
                        {
                            productPoints.map((singlePoint, index) => {
                                return <div key={index} className={styles.productPointDiv}>
                                    <input style={{ margin: '5px 0px', fontSize: '1.05rem' }} type='text' name={`productPoints${index}`} value={productPoints[index]} placeholder={`${index + 1}.`} onChange={(e) => handlePoints(e)} /><button className={styles.deleteBtn} onClick={(e) => deletePoint(e, index)}><HiTrash /></button>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className={styles.boxes}>
                    <div className={styles.radioBtnsInput}>
                        <span>Payment Method</span>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span
                                    style={{ margin: '0px 5px 0px 0px', backgroundColor: 'red', borderRadius: '50%', width: '12px', height: '12px', cursor: 'pointer' }}
                                    id='onlined' value='online' onClick={(e) => managePaymentOptions(e)}></span>
                                <label htmlFor='onlined' style={{ fontFamily: 'sans-serif' }}>Online</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                                <span
                                    style={{ margin: '0px 5px 0px 0px', backgroundColor: 'red', borderRadius: '50%', width: '12px', height: '12px', cursor: 'pointer' }}
                                    id='cashed' value='cash' onClick={(e) => managePaymentOptions(e)}></span>
                                <label htmlFor='cashed' style={{ fontFamily: 'sans-serif' }}>Cash</label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.inputTags}>
                        <span>Categorey</span>
                        <select className={styles.dropBoxCategorey} name='categorey' onChange={(e) => handleChange(e)}>
                            <option defaultChecked value='Bicycle'>Bicycle</option>
                            <option value='Accessory'>Accessories</option>
                        </select>
                    </div>
                </div>
                <div className={styles.btnUpdtDiv}>
                    <button className={styles.submitUpdateBtn} style={{ backgroundColor: 'rgb(9, 128, 13)' }} onClick={updateProduct}>Update Product</button>
                    <button className={styles.submitUpdateBtn} onClick={resetDetails}>Reset Details</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProductComp

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (err) => {
            reject(err);
        }
    })
}