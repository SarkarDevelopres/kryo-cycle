import { React, useState, useEffect } from 'react'
import styles from '../../styles/componentCSS/DoubleRangeSlider.module.css'
function DoubleRangeSlider({ getData,val }) {
    const [cond, setCond] = useState('hidden');
    const diff = 100;
    useEffect(() => {
        document.getElementById('min').value = 0;
        document.getElementById('minNum').innerText = '₹0';
        document.getElementById('max').value = val;
        document.getElementById('maxNum').innerText = `₹${val}`;
        // if (document.getElementById('min').value!=0 || document.getElementById('max').value!=1000) {
        //     setCond('visible');
        // } else {
        //     setCond('hidden')
        // }
    }, [])
    const rangeInput = (e) => {
        setCond('visible');
        if (e.target.id == 'min') {
            if (document.getElementById('max').value - e.target.value < 100) {
                if (document.getElementById('max').value < val) {
                    if (e.target.value < (val - 100)) {
                        document.getElementById('min').value = e.target.value;
                        document.getElementById('minNum').innerText = `₹${e.target.value}`;
                        document.getElementById('max').value = parseInt(e.target.value) + 100;
                        document.getElementById('maxNum').innerText = `₹${parseInt(e.target.value) + 100}`;
                        document.getElementById('pBar').style.left = `${((e.target.value) / val) * 100}%`;
                        document.getElementById('pBar').style.right = `${100 - (((parseInt(e.target.value) + 100) / val) * 100)}%`;


                    } else {
                        document.getElementById('min').value = val - 100;
                        document.getElementById('pBar').style.left = `${(parseInt(e.target.value) / 10)}%`;
                        document.getElementById('minNum').innerText = `₹${val - 100}`;
                        document.getElementById('max').value = val;
                        document.getElementById('maxNum').innerText = `₹${val}`;
                        document.getElementById('pBar').style.right = `${0}%`
                    }
                }
                else if (document.getElementById('max').value == val) {
                    document.getElementById('min').value = document.getElementById('max').value - 100;
                    // ProgressBar //
                    document.getElementById('pBar').style.right = `0%`
                    document.getElementById('pBar').style.left = `${(parseInt(e.target.value) / 10)}%`;
                    // ProgressBar //
                    document.getElementById('minNum').innerText = `₹${document.getElementById('max').value - 100}`;
                }
            } else {
                document.getElementById('min').value = e.target.value;
                document.getElementById('minNum').innerText = `₹${e.target.value}`;
                document.getElementById('pBar').style.left = `${((e.target.value / val) * 100)}%`;
            }
        } else {
            if (e.target.value - document.getElementById('min').value < 100) {
                if (document.getElementById('min').value > 0) {
                    if (e.target.value <= 100) {
                        document.getElementById('max').value = 100;
                        document.getElementById('maxNum').innerText = `₹100`;
                        document.getElementById('min').value = 0;
                        document.getElementById('minNum').innerText = `₹0`;
                        document.getElementById('pBar').style.left = `${0}%`;
                        document.getElementById('pBar').style.right = `${parseInt(e.target.value) / 10}%`;
                    } else {
                        document.getElementById('max').value = e.target.value;
                        document.getElementById('maxNum').innerText = `₹${e.target.value}`;
                        document.getElementById('min').value = e.target.value - 100;
                        document.getElementById('minNum').innerText = `₹${e.target.value - 100}`;
                        document.getElementById('pBar').style.left = `${(parseInt(e.target.value) - 100) / 10}%`;
                        document.getElementById('pBar').style.right = `${(val - parseInt(e.target.value)) / 10}%`;

                    }
                }
                else {
                    document.getElementById('max').value = 100;
                    document.getElementById('maxNum').innerText = `₹100`;
                    document.getElementById('min').value = 0;
                    document.getElementById('minNum').innerText = `₹0`;
                    document.getElementById('pBar').style.right = `${100 - ((100 / val) * 100)}%`;
                }
            } else {
                document.getElementById('max').value = e.target.value;
                document.getElementById('maxNum').innerText = `₹${e.target.value}`;
                document.getElementById('pBar').style.right = `${100 - (((e.target.value) / val) * 100)}%`;
            }
        }
    }
    const resetValues = () => {
        document.getElementById('min').value = 0;
        document.getElementById('minNum').innerText = '₹0';
        document.getElementById('max').value = val;
        document.getElementById('maxNum').innerText = `₹${val}`;
        document.getElementById('pBar').style.left = `0%`;
        document.getElementById('pBar').style.right = `0%`;
        setCond('hidden');
    }
    const sendDataBack = () => {
        getData({ min: document.getElementById('min').value, max: document.getElementById('max').value });
        // 
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.numberFields}>
                <div className={styles.fields}>
                    <span>Min</span>
                    <span id='minNum' className={styles.numberInput}></span>
                </div>
                <div className={styles.fields}>
                    <span>Max</span>
                    <span id='maxNum' className={styles.numberInput}></span>
                </div>
            </div>
            <div className={styles.rangeFields}>
                <div className={styles.progressBarDiv}>
                    <div id='pBar' className={styles.progressBar}></div>
                    <input id='min' type='range' onChange={(e) => rangeInput(e)} max={val} min={0} step={10} className={styles.rangeInput} />
                    <input id='max' type='range' onChange={(e) => rangeInput(e)} max={val} min={0} step={10} className={styles.rangeInput} />
                </div>
            </div>
            <div className={styles.btnContainer}>
                <div className={styles.btnBox}>
                    <button style={{ visibility: cond }} onClick={resetValues}>Reset</button>
                    <button onClick={sendDataBack}>Apply</button>
                </div>
            </div>
        </div>
    )
}
export default DoubleRangeSlider