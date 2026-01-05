import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import router from "./src/routes/api.js"


dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/v1", router)


app.listen(process.env.PORT, () => {
   console.log(`server is runing on port ${process.env.PORT}`)
})
