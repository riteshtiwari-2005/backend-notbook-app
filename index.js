const express = require("express");
const app = express();
const {ConnectoDb}=require("./config/databse") 
require("dotenv").config()
const PORT = process.env.PORT;
const cors=require("cors") 
app.use(cors())
//app.use(require("cors"))
//databse connection
ConnectoDb()   
// Middleware
app.use(express.json()); // Parse JSON bodies
app.use("/users",require("./routes/Login"))
app.use("/crud",require("./routes/Todo"))

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
