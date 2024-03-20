import UPI from '../../../models/UPI'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  if (req.method == "POST") {
    const { id,userId } = req.body;
    await UPI.findByIdAndDelete(id);
    let upiList  = await UPI.find({userId:userId});
    if (upiList.length==1) {
      await UPI.findOneAndUpdate({userId:userId},{isDefault:true});
    }
    res.status(200).json({ message: "UPI Deleted!" });
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)