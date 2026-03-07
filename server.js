import express from "express";
import dotenv from "dotenv";
import router from "./src/routes/authRoutes.js";
import { connectDb } from "./src/config/dbConfig.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to low level transaction management system" });
});

app.use("/api/auth", router);

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