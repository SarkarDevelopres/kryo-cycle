import User from '../../models/User'
import connectDB from '../../middleware/middleware'
const handler = async (req, res) => {
  const { id } = req.body;
  if (req.method == "POST") {
    let user = await User.findById(id).exec();
    res.status(200).json({ message: "Success",data:user });
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)