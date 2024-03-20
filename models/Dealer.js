const mongoose = require('mongoose');
const DealerSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique:true },
    CountryCode: { type: String, required: true },
    CountryName: { type: String, required: true },
    Phone: { type: Number, required: true },
    Password: { type: String, required: true },
    HeadQuater: { 
        BuildingNo:{type: String},
        RoadName:{type: String},
        Locality:{type: String},
        City:{type: String},
        State:{type: String},
        PinCode:{type: String},
        Nation:{type: String}
     },
     BankDetails: {
        IFSC:{type: String},
        Upi:{type: String},
        AccntNo:{type: Number},
        Phone:{type: Number}
     }
}, { timestamps: true });

export default mongoose.models.Dealer || mongoose.model("Dealer", DealerSchema);