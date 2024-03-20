const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    dealerId: { type: String, required: true },
    Name: { type: String, required: true },
    Image: { type: String, required: true },
    Price: { type: Number, required: true },
    Discount: { type: Number, required: true },
    Quantity: { type: Number, required: true },
    Description: { type: String, required: true },
    DescriptionTags: { type: Array, required: true },
    ProductPoints: { type: Array, required: true },
    Categorey: { type: String, required: true },
    PaymentMethods: { type: Array, required: true },
    Variants: { type: Array },
    Rating: { type: Number,default:0 },
    Review: [{
        userId:{type: String},
        ReviewContent:{type: String}
    }]
    
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);