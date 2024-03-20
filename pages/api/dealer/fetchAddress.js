import Dealer from '../../../models/Dealer'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  const { id } = req.body;
  if (req.method == "POST") {
    let dealer = await Dealer.findById(id);
    res.status(200).json({ message: "Success",data:dealer.HeadQuater });
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)