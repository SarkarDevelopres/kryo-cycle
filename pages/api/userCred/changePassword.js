import User from '../../../models/User'
import connectDB from '../../../middleware/middleware'
var CryptoJS = require("crypto-js");
const handler = async (req, res) => {
    if (req.method == "POST") {
        const {id,currentPass,newPass} = req.body
        let user = await User.findById(id);
        var bytes = CryptoJS.AES.decrypt(user.Password, `${process.env.NEXT_PUBLIC_SECRET_KEY}`);
        var originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (currentPass==originalPassword) {
            var encryptedPassword = CryptoJS.AES.encrypt(newPass, `${process.env.NEXT_PUBLIC_SECRET_KEY}`).toString();
            user.Password = encryptedPassword;
            await user.save();
            res.status(200).json({ message: "Success" });
        } else {
            res.status(300).json({ message: "Failure" });
        }
        res.status(200).json({message:"Success"});
    }
}
export default connectDB(handler)