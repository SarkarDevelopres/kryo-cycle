import OrderItem from '../../../models/OrderItem'
import connectDB from '../../../middleware/middleware'
import Razorpay from 'razorpay';
var CryptoJS = require("crypto-js");
const handler = async (req,res) => {
    if(req.method==="POST"){
        const {userId, productId, Quantity, paymentID, orderID, resOrderID, signature} = req.body;
        const secret = process.env.RAZORPAY_SECRET;
        var generated_signature = CryptoJS.HmacSHA256(orderID + "|" + paymentID, secret).toString();
        if (generated_signature === signature) {
            const razorpay = new Razorpay({
                key_id: process.env.RAZORPAY_KEY,
                key_secret: process.env.RAZORPAY_SECRET,
              });
            console.log("Payment is successful");
            let a = await razorpay.orders.fetchPayments(orderID);
            let price = parseInt(a.items[0].amount)/100;
            let orderItem = new OrderItem(
                {   
                    orderId:orderID,
                    userId:userId,
                    productId:productId,
                    Price:price,
                    Quantity:Quantity,
                    PaymentStatus:true,
                    PaymentMethod:a.items[0].method
                }
            )
            await orderItem.save();
            res.status(200).json({success:true, message:"Product Purchased Successfully!!"});
        }
        else{
            res.status(300).json({success:false, message:"Payment Error Occured!!"});
        }
    }
}

export default connectDB(handler)