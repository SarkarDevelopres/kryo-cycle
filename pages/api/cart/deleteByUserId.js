import CartItem from '../../../models/CartItem';
import connectDB from '../../../middleware/middleware';

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      // Attempt to delete the CartItem
      let b = await CartItem.deleteMany({userId:req.body});
        console.log(b);
      // If deletion is successful, respond with a success message
      res.status(200).json({ message: "Cart Item deleted!" });
    } else {
      // If the request method is not POST, respond with a 400 status code and a message
      res.status(400).json({ message: "Wrong Method" });
    }
  } catch (error) {
    // Handle any errors that occur during the operation
    console.error("Error deleting CartItem:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default connectDB(handler);
