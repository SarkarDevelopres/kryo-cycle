import Product from '../../../models/Product'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  if (req.method == "POST") {
    await Product.findByIdAndDelete(req.body);
    res.status(200).json({ message: "Success"});
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)