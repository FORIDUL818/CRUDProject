const userModel = require("../Model/UserModel");
const bcrypt =require("bcrypt");
const jwt =require("jsonwebtoken")
// userRegistration 

const Registration = async (req, res) => {
    try {
        
        const { firstName, lastName, email, password } = req.body;
        
        const userData = await userModel.create({
            firstName,
            lastName,
            email,
            password
        });
        
        // Remove password from response
        const userResponse = userData.toObject();
        delete userResponse.password;
        
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: userResponse
        });
        
    } catch (error) {
        
        // Duplicate email error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }
        
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// userRegistration 


// user login

 let login = async (req,res) => {
    try {
        let {email,password} =req.body;

        let userData = await userModel.findOne({email});
        
      if (!userData) {
        return res.status(401).json({message:"your email is not correct"})
      }
      let isPassword = await bcrypt.compare(password,userData.password);

      if (!isPassword) {
        return res.status(401).json({message:"your password is incorrect"})
      }
      let token = jwt.sign({ email: userData.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
          
      res.status(200).json({
        message:"success",
        password:isPassword,
        data:userData,
        Token:token
      })


    } catch (err) {
        res.status(401).json({data:err})
    }
 }

// user login 

// profile update

let profileUpdate = async (req,res) => {
    try {
        let email = req.headers.email
        let quary = {email:email}
        let body = req.body;

        let user = userModel.updateOne(quary,body);

        if ( user.matchedCount===0) {
           return res.status(401).json({message:"fail",data:"data not updated"})
        }
        req.status(200).json({data:user,message:"success"})

    } catch (err) {
        res.status(401).json({err})
    }
}

// profile update

module.exports = {
    Registration,
    login,
    profileUpdate
}

