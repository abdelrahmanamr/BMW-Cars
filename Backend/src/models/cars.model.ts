import mongoose, { Model, Document } from "mongoose";

interface ICar extends Document {
  brand: string;
  carModel: string;
  accelSec: number;
  topSpeed_Kmh: number;
  range_Km: number;
  efficiency_WhKm: number;
  rapidCharge: boolean;
  powerTrain: string;
  plugType: string;
  bodyStyle: string;
  segment: string;
  seats: number;
  priceEuro: number;
  date: Date;
  fastCharge_KmH?: number;
}

const CarSchema = new mongoose.Schema<ICar>(
  {
    brand: {
      type: String,
      required: true,
    },
    carModel: {
      type: String,
      required: true,
    },
    accelSec: {
      type: Number,
      required: true,
    },
    topSpeed_Kmh: {
      type: Number,
      required: true,
    },
    range_Km: {
      type: Number,
      required: true,
    },
    efficiency_WhKm: {
      type: Number,
      required: true,
    },
    fastCharge_KmH: {
      type: Number,
    },
    rapidCharge: {
      type: Boolean,
      required: true,
    },
    powerTrain: {
      type: String,
      enum: ["AWD", "RWD", "FWD"],
      required: true,
    },
    plugType: {
      type: String,
      required: true,
    },
    bodyStyle: {
      type: String,
      required: true,
    },
    segment: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    priceEuro: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Car: Model<ICar> = mongoose.model<ICar>("Car", CarSchema);

export default Car;
