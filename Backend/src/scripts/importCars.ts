import fs from "fs";
import path from "path";
import csv from "csv-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Car from "../models/cars.model";

dotenv.config();

const filePath = path.join(
  __dirname,
  "../data/BMW_Aptitude_Test_Test_Data_ElectricCarData.csv"
);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
    importCSV();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

function parseBoolean(value: string): boolean {
  return value.trim().toLowerCase() === "yes";
}

function parseDate(value: string): Date {
  // Assuming format like "1/5/17" → Jan 5, 2017
  const [month, day, year] = value.split("/");
  return new Date(
    `20${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
  );
}

const parseFastCharge = (val) => {
  if (val === "-" || val === undefined || val === null) return undefined;
  const num = parseInt(val);
  return isNaN(num) ? undefined : num;
};

async function importCSV() {
  const cars: any[] = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      try {
        const car = {
          brand: row.Brand?.trim(),
          carModel: row.Model,
          accelSec: parseFloat(row["AccelSec"]),
          topSpeed_Kmh: parseInt(row["TopSpeed_KmH"]),
          range_Km: parseInt(row["Range_Km"]),
          efficiency_WhKm: parseInt(row["Efficiency_WhKm"]),
          fastCharge_KmH: parseFastCharge(row["FastCharge_KmH"]),
          rapidCharge: parseBoolean(row["RapidCharge"]),
          powerTrain: row["PowerTrain"],
          plugType: row["PlugType"],
          bodyStyle: row["BodyStyle"],
          segment: row["Segment"],
          seats: parseInt(row["Seats"]),
          priceEuro: parseInt(row["PriceEuro"]),
          date: parseDate(row["Date"]),
        };
        cars.push(car);
      } catch (err) {
        console.error("Error parsing row:", err);
      }
    })
    .on("end", async () => {
      try {
        await Car.insertMany(cars);
        console.log(`✅ Imported ${cars.length} cars into MongoDB`);
        process.exit(0);
      } catch (err) {
        console.error("❌ Error inserting into MongoDB:", err);
        process.exit(1);
      }
    });
}
