import OrderItem from '../../../models/OrderItem'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  const { id } = req.body;
  if (req.method == "POST") {
    // console.log(id);
    let orderList = await OrderItem.find({userId:id});
    // console.log(orderList);
    res.status(200).json({ message: "Success",data:orderList });
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)