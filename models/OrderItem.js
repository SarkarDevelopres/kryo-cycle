const mongoose = require('mongoose');
const OrderItemSchema = new mongoose.Schema({
    orderId:{type: String, required: true},
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    Price: {type: Number, required: true },
    Quantity: { type: Number, required: true },
    PaymentStatus: { type: Boolean, default:false },
    PaymentMethod: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.models.OrderItem || mongoose.model("OrderItem", OrderItemSchema);