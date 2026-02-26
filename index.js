const app = require("./app");
let Port = process.env.PORT || 3000;

app.listen(Port,()=>{
    console.log(`server is running http://localhost:${Port}`);
}) 