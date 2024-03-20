import Product from '../../../models/Product'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  if (req.method == "POST") {
    // console.log(req.body);
    let product = await Product.findById(req.body);
    // console.log(product);
    res.status(200).json({ message: "Success",data:product });
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)