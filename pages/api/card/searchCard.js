import Card from '../../../models/Card'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  const { id } = req.body;
  if (req.method == "POST") {
    // console.log(id);
    let cardList = await Card.find({userId:id});
    res.status(200).json({ message: "Success",data:cardList });
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)