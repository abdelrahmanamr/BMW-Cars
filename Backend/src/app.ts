import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { carRouter } from "./routes/car.route";

dotenv.config();
const app = express();
const port = 8080;

// middle ware
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/cars", carRouter);

app.get("/", (req, res) => {
  res.json(200).send("App connected successfully");
});

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      return console.log(`Server is listening at http://localhost:${port}`);
    });
  })
  .catch(() => {
    console.log("Connection Failed!");
  });
