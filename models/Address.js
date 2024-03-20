const mongoose = require('mongoose');
const AddressSchema = new mongoose.Schema({
    userId:{type: String,required:true},
    ResidentName:{type: String,required:true},
    FlatHouseNumber: { type: String},
    LaneNumber: { type: String},
    Locality: { type: String},
    City: { type: String},
    State: { type: String},
    PinCode: { type: String},
    isDefault:{type:Boolean}
}, { timestamps: true });

export default mongoose.models.Address || mongoose.model("Address", AddressSchema);