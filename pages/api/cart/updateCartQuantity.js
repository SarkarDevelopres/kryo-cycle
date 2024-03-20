import CartItem from '../../../models/CartItem'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  if (req.method == "POST") {
    const {id,Quantity} = req.body;
    let cartItemList = await CartItem.findByIdAndUpdate(id,{Quantity:Quantity});
    res.status(200).json({message:"Success"});
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)