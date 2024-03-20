import Address from '../../../models/Address'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  if (req.method == "POST") {
    const { userId, ResidentName,FlatHouseNumber,LaneNumber,Locality,City,State,PinCode } = req.body;
    let addressList = await Address.find({userId:userId});
    // console.log(addressList);
    if (addressList.length==0) {
        let address = new Address({
            userId:userId,
            ResidentName:ResidentName,
            FlatHouseNumber:FlatHouseNumber,
            LaneNumber:LaneNumber,
            Locality:Locality,
            City:City,
            State:State,
            PinCode:PinCode,
            isDefault:true});
        await address.save();
        res.status(200).json({ message: "Success" });
    } else {
        let address = new Address({
            userId:userId,
            ResidentName:ResidentName,
            FlatHouseNumber:FlatHouseNumber,
            LaneNumber:LaneNumber,
            Locality:Locality,
            City:City,
            State:State,
            PinCode:PinCode,
            isDefault:false});
        await address.save();
        res.status(200).json({ message: "Success" });
    }
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)