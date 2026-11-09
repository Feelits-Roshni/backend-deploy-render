const express=require("express");
const dbConnection = require("./config/dbConnection");
const userRouter=require("./router/user.router");
const productRouter=require("./router/product.router");
const cors=require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth",userRouter);
app.use("/products", productRouter);
require("dotenv").config();
dbConnection();
app.listen(process.env.port, () => {
  console.log(`server running successfully ${process.env.port}`);
});