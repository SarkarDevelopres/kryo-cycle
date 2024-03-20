import User from '../../../models/User'
import connectDB from '../../../middleware/middleware'

const handler = async (req, res) => {
    if (req.method == "POST") {
        const {id,phone} = req.body
        let user = await User.findById(id);
        user.Phone = phone;
        user.Verified = {email:user.Verified.email,phone:false}
        await user.save();
        res.status(200).json({message:"Success"});
    }
}
export default connectDB(handler)