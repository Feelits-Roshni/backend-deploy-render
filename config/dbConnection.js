const mongoose = require("mongoose");
const dbConnection = async(req,res)=>{
    try{
await mongoose.connect(process.env.db_uri);
console.log("db connected successfully")
    }
    catch(err)
    {
        process.exit(1);
        console.log(err)
    }
};
module.exports=dbConnection;