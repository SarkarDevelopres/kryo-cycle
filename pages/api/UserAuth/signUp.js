import User from '../../../models/User'
import connectDB from '../../../middleware/middleware'
var CryptoJS = require("crypto-js");
const handler = async (req, res) => {
  const { FirstName, LastName, Email, CountryCode, CountryName, Phone, Password } = req.body;
  if (req.method == "POST") {
    let searchUser = await User.findOne({ "Email": Email, "Phone": Phone, "CountryCode": CountryCode });
    if (searchUser) {
      res.status(300).json({message:"User Already Exist!!"})
    } else {
      var encryptedPassword = CryptoJS.AES.encrypt(Password, `${process.env.NEXT_PUBLIC_SECRET_KEY}`).toString();
      let user = new User({ FirstName: FirstName, LastName: LastName, Email: Email, CountryCode: CountryCode, CountryName: CountryName, Phone: Phone, Password: encryptedPassword });
      await user.save();
      res.status(200).json({ message: "Success" });
    }
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)
