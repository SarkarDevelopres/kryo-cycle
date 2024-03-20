import Card from '../../../models/Card'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  if (req.method == "POST") {
    const { id,userId,isDefault } = req.body;
    await Card.findOneAndUpdate({userId:userId,isDefault:true},{isDefault:false});
    await Card.findOneAndUpdate({_id:id},{isDefault:isDefault});
    res.status(200).json({ message: "Success" });
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)