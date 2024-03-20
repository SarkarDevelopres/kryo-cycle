// import mongoose from 'mongoose';

// const connectDB = handler => async(req,res)=>{
//     if(mongoose.connections[0].readyState){
//         return handler(req,res);
//     }
//     await mongoose.connect(process.env.MGDB_SRV);
//     return handler(req,res);
// }
// export default connectDB;
const mongoose = require('mongoose');

const connectDB = handler => async (req, res) => {
    try {
        if (mongoose.connections[0]?.readyState) {
            // console.log("Already Connected!");
            return handler(req, res);
        }
        await mongoose.connect(process.env.MGDB_SRV, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // console.log("Now Connected!");
        return handler(req, res);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        // Handle the error appropriately, e.g., send an error response
        res.status(500).json({ error: 'Database connection error' });
    }
};

module.exports = connectDB;
