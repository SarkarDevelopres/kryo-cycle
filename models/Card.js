const mongoose = require('mongoose');
const CardSchema = new mongoose.Schema({
    userId:{type: String,required:true},
    CardNo:{type: Number,required:true},
    UserName:{type: String,required:true},
    BankName:{type: String,required:true},
    ExpiryDate:{type: String,required:true},
    CardType:{type: String,required:true},
    isDefault:{type:Boolean}
}, { timestamps: true });

export default mongoose.models.Card || mongoose.model("Card", CardSchema);