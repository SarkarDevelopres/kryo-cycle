import Product from '../../../models/Product';
import connectDB from '../../../middleware/middleware';

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const keyword = req.body;

    try {
        const productList = await Product.find({
            $or: [
                { DescriptionTags: { $regex: new RegExp(keyword, 'i') } },
                { Name: { $regex: new RegExp(keyword, 'i') } },
                { Categorey: { $regex: new RegExp(keyword, 'i') } }
            ]
        }).select('_id').exec();
        // console.log("Results:", productList);
        res.status(200).json(productList);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default connectDB(handler);
