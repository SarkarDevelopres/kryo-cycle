const mongoose = require('mongoose');
const InventorySchema = new mongoose.Schema({
    dealerId: { type: String, required: true },
    productId: { type: String, required: true },
    Quantity: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.models.Inventory || mongoose.model("Inventory", InventorySchema);