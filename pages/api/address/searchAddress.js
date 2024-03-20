import Address from '../../../models/Address'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  const { id } = req.body;
  if (req.method == "POST") {
    // console.log(id);
    let addressList = await Address.find({userId:id});
    res.status(200).json({ message: "Success",data:addressList });
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)