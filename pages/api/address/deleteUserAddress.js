import Address from '../../../models/Address'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  if (req.method == "POST") {
    const { id,userId } = req.body;
    await Address.findByIdAndDelete(id);
    let addressList  = await Address.find({userId:userId});
    if (addressList.length==1) {
      await Address.findOneAndUpdate({userId:userId},{isDefault:true});
    }
    res.status(200).json({ message: "Success" });
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)