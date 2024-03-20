import CartItem from '../../../models/CartItem'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  if (req.method == "POST") {
    const {userId,productId,Quantity} = req.body;
    let cartItem = await CartItem.find({userId:userId,productId:productId});
    if(cartItem.length>0){
        let prevQuantity = cartItem[0].Quantity;
        let newQuantity = parseInt(Quantity)+parseInt(prevQuantity);
        await CartItem.findByIdAndUpdate({_id:cartItem[0].id},{
            Quantity:newQuantity
        })
        res.status(200).json({ message: "Success" });
    }
    else{
        let newCartItem = new CartItem(req.body);
        await newCartItem.save();
        res.status(200).json({ message: "Success" });
    }
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)