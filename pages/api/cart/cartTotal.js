import Product from '../../../models/Product'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  if (req.method == "POST") {
    let productList = req.body;
    let sum = 0;
    for (let i = 0; i < req.body.length; i++) {
        let a = await Product.findById(req.body[i].id);
        productList[i] = {...productList[i],price:a.Price} 
        sum = sum + ((a.Price)*req.body[i].qnty);
    }
    // console.log(sum);
    res.status(200).json({'sum':sum,'productList':productList});
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)