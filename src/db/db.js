const mongoose =require("mongoose");


let connectDB =async () => {
    return mongoose.connect(process.env.MONGO_URI)
}

module.exports = connectDB;