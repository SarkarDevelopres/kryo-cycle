import Product from '../../../models/Product'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  if (req.method == "POST") {
    let productList = await Product.find({"dealerId":req.body});
    let productIdList = [];
    productList.forEach(element => {productIdList.push(element._id)});
    res.status(200).json({ message: "Success",data:productIdList });
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)