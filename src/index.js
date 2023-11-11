const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connect");
const app = express();
var cors = require("cors");
const authRouter = require("./routes/routes");
app.use(cors());
app.use(express.json());
app.use("/api",authRouter);

// Connect to MongoDB database
const port = process.env.PORT || 5000;

const startServer = async() => {
  try{
    await connectDB(process.env.MONGO_URL);
    app.listen(port,() => {
      console.log(`Server started on ${port}`);
    });
  }catch (error){
    console.log("error => ",error);
    }
  };
  startServer();
