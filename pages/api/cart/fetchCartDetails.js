import CartItem from '../../../models/CartItem'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  if (req.method == "POST") {
    const {userId} = req.body;
    let cartItemList = await CartItem.find({userId:userId});
    res.status(200).json(cartItemList);
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)