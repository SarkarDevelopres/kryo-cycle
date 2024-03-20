import UPI from '../../../models/UPI'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  const { id, upi } = req.body;
  // console.log(upi.userId);
  if (req.method == "POST") {
    await UPI.findOneAndUpdate({_id:id},{userId:upi.userId,
        userId: upi.userId,
        UPINo: upi.UPINo,
        PhoneNo: upi.PhoneNo,
        isDefault:upi.isDefault});
    res.status(200).json({ message: "UPI Successfully Updated!" });
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)