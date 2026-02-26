const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        max : [19,"your name charecter limit is finis"],
        min : [2, "your name is too smoll"],
        required:true
    },
    lastName:{
        type:String,
        max : [19,"your name charecter limit is finis"],
        min : [2, "your name is too smoll"],
        required:true
    },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
        validator: function (v) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(v);
        },
        message: props => `${props.value} is not a valid email!`
    }
},
    password:{
        type:String,
        required:true,
        set:(v)=>{
          return bcrypt.hashSync(v,bcrypt.genSaltSync(10));
        }
    },
    role:["admin"]
    
},{versionKey:false,timestamps:true});

let userModel = mongoose.model("users",userSchema);

module.exports = userModel;