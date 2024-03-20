import UPI from '../../../models/UPI'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  if (req.method == "POST") {
    const { userId,UPINo,PhoneNo} = req.body;
    let upiList = await UPI.find({userId:userId});
    // console.log(addressList);
    if (upiList.length==0) {
        let upi = new UPI({
            userId: userId,
            UPINo: UPINo,
            PhoneNo: PhoneNo,
            isDefault: true});
        await upi.save();
        res.status(200).json({ message: "Success" });
    } else {
        let upi = new UPI({
            userId: userId,
            UPINo: UPINo,
            PhoneNo: PhoneNo,
            isDefault: false});
        await upi.save();
        res.status(200).json({ message: "Success" });
    }
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)