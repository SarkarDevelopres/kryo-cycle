import User from '../../../models/User'
import connectDB from '../../../middleware/middleware'

const handler = async (req, res) => {
    if (req.method == "POST") {
        const {id,email} = req.body
        let user = await User.findById(id);
        user.Email = email;
        user.Verified = {email:false,phone:user.Verified.phone}
        await user.save();
        res.status(200).json({message:"Success"});
    }
}
export default connectDB(handler)