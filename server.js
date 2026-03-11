import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authrouter from "./src/routes/authRoutes.js";
import { connectDb } from "./src/config/dbConfig.js";
import cookieParser from "cookie-parser";
import accountrouter from "./src/routes/accountRoutes.js"


const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to low level transaction management system" });
});

app.use("/api/auth", authrouter);
app.use("/api/account",accountrouter);

const startServer = async () => {
  try {
    await connectDb();

    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });

  } catch (err) {
    console.log("server connection failed", err);
    process.exit(1);
  }
};

startServer();