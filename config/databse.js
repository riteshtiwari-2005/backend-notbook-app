const mongoose=require("mongoose")

exports.ConnectoDb=async()=>{
    console.log(process.env.MONGO_URI)
    mongoose.connect(process.env.MONGO_URI,{
  tls: true,
  tlsInsecure: false, // only true if you're debugging cert issues
  serverApi: '1',     // if using newer versions (MongoDB 6+)
}).then(()=>{
        console.log("Database Connection Suuccessfully") 
    }).catch((error)=>{
        console.log(error)
    })

}