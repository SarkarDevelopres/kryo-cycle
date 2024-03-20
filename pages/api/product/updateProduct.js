import Product from '../../../models/Product'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
    if (req.method == "POST") {
        const { data, id } = req.body;
        await Product.findByIdAndUpdate({ _id: id }, {
            dealerId: data.dealerId,
            Name: data.Name,
            Image: data.Image,
            Price: data.Price,
            Discount: data.Discount,
            Quantity: data.Quantity,
            Description: data.Description,
            ProductPoints: data.ProductPoints,
            Categorey: data.Categorey,
            PaymentMethods: data.PaymentMethods
        });
        res.status(200).json({ message: "Success" });
    } else {
        res.status(400).json({ message: "Wrong Method" });
    }
}

export default connectDB(handler)