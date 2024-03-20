const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: { type: String, required: true, unique:true },
    CountryCode: { type: String, required: true },
    CountryName: { type: String, required: true },
    Phone: { type: Number, required: true },
    Password: { type: String, required: true },
    Verified:{type:Object, default:{email:false,phone:false}}
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);