const jwt = require("jsonwebtoken");
module.exports = (req,res,next)=>{
    let token = req.headers["token"];
   jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
    if (err) {
      return  res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
    let email = decode.data;
    req.headers.email =email;
    next();
   })
}