import Product from '../../../models/Product'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
    const{min,max}=req.body
    let maximus = parseInt(max)
    let minimus = parseInt(min)
    let productIdList = await Product.find({
        $and: [
          { Price: { $gte: minimus } },
          { Price: { $lte: maximus } }
        ]
      }).select('_id').exec();
      
    // console.log(productIdList);
    res.status(200).json(productIdList);
}

export default connectDB(handler)