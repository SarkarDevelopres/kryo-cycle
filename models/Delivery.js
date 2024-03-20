const mongoose = require('mongoose');
const DeliverySchema = new mongoose.Schema({
    addressId:{ type: String, required: true },
    productId: { type: String, required: true },
    Quantity: { type: Number, required: true },
    PaymentStatus: { type: Boolean, required: true },
    DeliveryStaus:{ type: String, required: true },
    DeliveryDate:{ type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Delivery || mongoose.model("Delivery", DeliverySchema);