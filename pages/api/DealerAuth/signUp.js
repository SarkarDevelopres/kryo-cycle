import Dealer from '../../../models/Dealer'
import connectDB from '../../../middleware/middleware'
var CryptoJS = require("crypto-js");
const handler = async (req, res) => {
  const { Name, Email, CountryCode, CountryName, Phone, Password } = req.body;
  if (req.method == "POST") {
    let exisitingDealer = await Dealer.findOne({"Email":Email});
    console.log(exisitingDealer);
    if (exisitingDealer) {
      res.status(200).json({ message: "You already have an account! Login!" });
    } else {
      var encryptedPassword = CryptoJS.AES.encrypt(Password, `${process.env.NEXT_PUBLIC_SECRET_KEY}`).toString();
      let dealer = new Dealer({ Name: Name, Email: Email, CountryCode: CountryCode, CountryName: CountryName, Phone: Phone, Password: encryptedPassword });
      await dealer.save();
      res.status(200).json({ message: "Account Successfully Created!" });
    }
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)
