import Address from '../../../models/Address'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  const { id, address } = req.body;
  // console.log(address.userId);
  if (req.method == "POST") {
    await Address.findOneAndUpdate({_id:id},{userId:address.userId,
      ResidentName:address.ResidentName,
      FlatHouseNumber:address.FlatHouseNumber,
      LaneNumber:address.LaneNumber,
      Locality:address.Locality,
      City:address.City,
      State:address.State,
      PinCode:address.PinCode,
      isDefault:address.isDefault});
    res.status(200).json({ message: "Success" });
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)