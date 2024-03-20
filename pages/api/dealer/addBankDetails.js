import Dealer from '../../../models/Dealer'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  const { id,bankDetails } = req.body;
  if (req.method == "POST") {
    // let dealer = 
    await Dealer.findByIdAndUpdate(id,{BankDetails:bankDetails});
    // dealer.HeadQuater={...address};
    // await dealer.save();
    res.status(200).json({ message: "Success" });
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)