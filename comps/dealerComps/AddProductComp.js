import { React, useEffect, useState } from 'react'
import styles from '../../styles/componentCSS/addProductComp.module.css'
import { HiPlus, HiTrash } from "react-icons/hi";
function AddProductComp({ id }) {
    const [mainImg, setMainImg] = useState("../add_product.jpg");
    const [data, setData] = useState({
        Name: '',
        Price: '',
        Discount: '',
        Quantity: '',
        Categorey: 'Bicycle',
        Description: '',
        PaymentMethods: []
    })
    const [productPoints, setProductPoints] = useState([]);
    const [descriptionTags, setDescriptionTags] = useState([]);
    const [variants, setVariants] = useState([]);
    const loadImage = async (e) => {
        if (e.target.name == 'mainImg') {
            const file = e.target.files[0];
            const base64 = await convertToBase64(file);
            // console.log(base64);
            setMainImg(`${base64}`);
            console.log(mainImg);
        }
    }
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
    const handleVariants = (e) => {
        for (let i = 0; i < variants.length; i++) {
            if (e.target.name === `variants${i}`) {
                setVariants(s => [...s.slice(0, i), e.target.value, ...s.slice(i + 1)]);
            }
        }
    }
    const addVariants = () => {
        setVariants((pS) => ([
            ...pS, ""
        ]))
    }
    const deleteVariants = (e, index) => {
        setVariants((s) => (s.slice(0, index)).concat(s.slice(index + 1, s.length)));
    }
    const managePaymentOptions = (e) => {
        if (e.target.id == "cash") {
            if (data.PaymentMethods.includes("cash")) {
                document.getElementById('cash').style.backgroundColor = 'red';
                document.getElementById('online').style.backgroundColor = 'black';
                setData((prevState) => ({
                    ...prevState,
                    PaymentMethods: ["online"]
                }));
            } else {
                document.getElementById('cash').style.backgroundColor = 'black';
                setData((prevState) => ({
                    ...prevState,
                    PaymentMethods: [...data.PaymentMethods, "cash"]
                }));
            }
        } else {
            if (data.PaymentMethods.includes("online")) {
                document.getElementById('online').style.backgroundColor = 'red';
                document.getElementById('cash').style.backgroundColor = 'black';
                setData((prevState) => ({
                    ...prevState,
                    PaymentMethods: ["cash"]
                }));
            } else {
                document.getElementById('online').style.backgroundColor = 'black';
                setData((prevState) => ({
                    ...prevState,
                    PaymentMethods: [...data.PaymentMethods, "online"]
                }));
            }
        }
    }
    const addProduct = async () => {
        let finalData = {
            dealerId: id,
            Name: data.Name,
            Image: mainImg,
            Price: data.Price,
            Discount: data.Discount,
            Quantity: data.Quantity,
            Description: data.Description,
            DescriptionTags: descriptionTags,
            ProductPoints: productPoints,
            Categorey: data.Categorey,
            PaymentMethods: data.PaymentMethods,
            Variants:variants
        }
        let a = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/dealer/addProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(finalData),
        });
        let r = await a.json();
        if (r.message == 'Success') {
            alert("Product Added Succesfully!");
            location.reload();
        }
        else {
            alert("Some Error Occured Please Try Again !!")
        }
    }
    return (
        <div className={styles.mainDiv}>
            <div className={styles.topDiv}>
                <label htmlFor='mainImg' style={{ cursor: 'pointer' }}><img src={mainImg} width={300} /></label>
                <input style={{ display: 'none' }} id='mainImg' name='mainImg' type='file' onChange={(e) => loadImage(e)} />
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
                    <div className={styles.inputTags}>
                        <span>Description</span>
                        <input type='text' name='description' value={data.Description} onChange={(e) => handleChange(e)} />
                    </div>
                </div>
            </div>
            <div className={styles.lowerDiv}>
                <div className={styles.inputTags} >
                    <span>Decription Tags</span>
                    <div style={{ display: 'flex' }}>
                        <div className={styles.descTagsBtnDiv}>
                            <button className={styles.addTagBtn} onClick={addDescriptionTags}>Add Single Word Tags</button>
                        </div>
                        <div className={styles.descTagsDiv}>
                            {
                                descriptionTags.map((singleTag, index) => {
                                    return <div key={index} className={styles.descOneTagDiv}>
                                        <input type='text' name={`descriptionTags${index}`} onChange={(e)=> handleTags(e)} ></input>
                                        <button onClick={(e)=>deleteTags(e,index)}><HiTrash /></button>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.inputTags} >
                    <span>Variants</span>
                    <div style={{ display: 'flex' }}>
                        <div className={styles.descTagsBtnDiv}>
                            <button className={styles.addTagBtn} onClick={addVariants}>Add Variants</button>
                        </div>
                        <div className={styles.descTagsDiv}>
                            {
                                variants.map((singleTag, index) => {
                                    return <div key={index} className={styles.descOneTagDiv}>
                                        <input type='text' name={`variants${index}`} onChange={(e)=> handleVariants(e)} ></input>
                                        <button onClick={(e)=>deleteVariants(e,index)}><HiTrash /></button>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.inputTags}>
                    <button className={styles.addProductPointBtn} onClick={addProductPoints}><HiPlus />Add Product Points</button>
                    <div className={styles.allProductPoints}>
                        {
                            productPoints.map((singlePoint, index) => {
                                return <div key={index} className={styles.productPointDiv}>
                                    <input style={{ margin: '5px 0px', fontSize: '20px' }} type='text' name={`productPoints${index}`} value={productPoints[index]} placeholder={`${index + 1}.`} onChange={(e) => handlePoints(e)} /><button className={styles.deleteBtn} onClick={(e) => deletePoint(e, index)}><HiTrash /></button>
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
                                    id='online' value='online' onClick={(e) => managePaymentOptions(e)}></span>
                                <label htmlFor='online' style={{ fontFamily: 'sans-serif' }}>Online</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                                <span
                                    style={{ margin: '0px 5px 0px 0px', backgroundColor: 'red', borderRadius: '50%', width: '12px', height: '12px', cursor: 'pointer' }}
                                    id='cash' value='cash' onClick={(e) => managePaymentOptions(e)}></span>
                                <label htmlFor='cash' style={{ fontFamily: 'sans-serif' }}>Cash</label>
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
                <button className={styles.submitBtn} onClick={addProduct}>Add Product +</button>
            </div>
        </div>
    )
}

export default AddProductComp

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