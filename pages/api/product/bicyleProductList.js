import Product from '../../../models/Product';
import connectDB from '../../../middleware/middleware';

const handler = async (req, res) => {
    try {
        // Fetch list of products from the database
        const productIdList = await Product.find({Categorey:"Bicycle"}).select('_id').exec();
        // console.log(productIdList);
        // Respond to the client with the list of products
        res.status(200).json(productIdList);
    } catch (error) {
        console.error('Error fetching product list:', error);
        res.status(500).json({ error: 'Server error' }); // Handle internal server error
    }
};

export default connectDB(handler);
