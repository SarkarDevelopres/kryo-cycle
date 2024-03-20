import UPI from '../../../models/UPI'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  if (req.method == "POST") {
    const { id,userId,isDefault } = req.body;
    await UPI.findOneAndUpdate({userId:userId,isDefault:true},{isDefault:false});
    await UPI.findOneAndUpdate({_id:id},{isDefault:isDefault});
    res.status(200).json({ message: "Default UPI Changed!" });
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)