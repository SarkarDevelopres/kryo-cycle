import Product from '../../../models/Product'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
    let productTimeList = await Product.find({},{createdAt:1});
    res.status(200).json(productTimeList);
}

export default connectDB(handler)