const mongoose = require('mongoose');
const UPISchema = new mongoose.Schema({
    userId:{type: String,required:true},
    UPINo: {type: String,required:true},
    PhoneNo:{type: Number,required:true},
    isDefault:{type:Boolean}
}, { timestamps: true });

export default mongoose.models.UPI || mongoose.model("UPI", UPISchema);