import Card from '../../../models/Card'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  if (req.method == "POST") {
    const { id,userId } = req.body;
    await Card.findByIdAndDelete(id);
    let cardList  = await Card.find({userId:userId});
    if (cardList.length==1) {
      await Card.findOneAndUpdate({userId:userId},{isDefault:true});
    }
    res.status(200).json({ message: "Success" });
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)