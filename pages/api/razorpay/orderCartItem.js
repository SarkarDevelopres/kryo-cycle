import OrderItem from '../../../models/OrderItem';
import connectDB from '../../../middleware/middleware';
import Razorpay from 'razorpay';
const CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { userId, productQntyList, paymentID, orderID, resOrderID, signature } = req.body;
            console.log(productQntyList);
            const secret = process.env.RAZORPAY_SECRET;
            const generated_signature = CryptoJS.HmacSHA256(orderID + "|" + paymentID, secret).toString();

            if (generated_signature === signature) {
                const razorpay = new Razorpay({
                    key_id: process.env.RAZORPAY_KEY,
                    key_secret: process.env.RAZORPAY_SECRET,
                });

                console.log("Payment is successful");
                const payment = await razorpay.orders.fetchPayments(orderID);
                const price = parseInt(payment.items[0].amount) / 100;

                for (let i = 0; i < productQntyList.length; i++) {
                    let orderItem = new OrderItem({
                        orderId: orderID,
                        userId: userId,
                        productId: productQntyList[i].id,
                        Price: productQntyList[i].price,
                        Quantity: productQntyList[i].qnty,
                        PaymentStatus: true,
                        PaymentMethod: payment.items[0].method
                    });
                    console.log(orderItem);
                    await orderItem.save();
                }

                return res.status(200).json({ success: true, message: "Product Purchased Successfully!!" });
            } else {
                return res.status(400).json({ success: false, message: "Invalid signature. Payment Error Occurred!" });
            }
        } catch (error) {
            console.error("Error processing payment:", error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    } else {
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
}

export default connectDB(handler);
