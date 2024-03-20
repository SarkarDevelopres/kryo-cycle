const mongoose = require('mongoose');
const CartItemSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    Quantity: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.models.CartItem || mongoose.model("CartItem", CartItemSchema);