import Product from '../../../models/Product'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
    let productPriceArray = await Product.find({Categorey:"Bicycle"});
    let productPriceList = [];
    for (let i = 0; i < productPriceArray.length; i++) {
        productPriceList.push(productPriceArray[i].Price)
    }
    // productList.forEach(element => { productPriceList.push(element.price) });
    function indexOfMax(arr) {
        if (arr.length === 0) {
            return -1;
        }
    
        var max = arr[0];
        var maxIndex = 0;
    
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }
    
        return maxIndex;
    }
    let greatestIndex=indexOfMax(productPriceList);
    let greatestValue = productPriceList[greatestIndex];
    // console.log(greatestValue);
    res.status(200).json(greatestValue);
}

export default connectDB(handler)