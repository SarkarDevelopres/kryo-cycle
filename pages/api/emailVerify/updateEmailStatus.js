import User from '../../../models/User'
import connectDB from '../../../middleware/middleware'

const handler = async (req, res) => {
    if (req.method == "POST") {
        const {id,phone} = req.body
        let Veri = {email:true,phone:phone}
        // console.log(Veri);
        let user = await User.findById(id);
        user.Verified = {...Veri};
        // console.log(user.Verified);
        await user.save();
        res.status(200).json({message:"Success"});
    }
}
export default connectDB(handler)