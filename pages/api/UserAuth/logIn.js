import User from '../../../models/User'
import connectDB from '../../../middleware/middleware'
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
const handler = async (req, res) => {
    const { Email, CountryCode, Phone, Password } = req.body;
    if (req.method == "POST") {
        let user = await User.findOne({ "Email": Email, "Phone": Phone, "CountryCode": CountryCode });
        if (user) {
            // Decrypt
            var bytes = CryptoJS.AES.decrypt(user.Password, `${process.env.NEXT_PUBLIC_SECRET_KEY}`);
            var originalPassword = bytes.toString(CryptoJS.enc.Utf8);
            if (Password==originalPassword) {
                var token = jwt.sign({id:user._id,categorey:'user'},`${process.env.NEXT_PUBLIC_TOKEN_SECRET}`,{expiresIn:'12h'});
                res.status(200).json({ message: "You're Logged In Successfully!",token:token });
            } else {
                res.status(300).json({ message: "Incorrect Credentials!" });
            }
        } else {
            res.status(500).json({ message: "User doesn't exists!" });
        }
    } else {
        res.status(400).json({ message: "Wrong Method" });
    }
}

export default connectDB(handler)