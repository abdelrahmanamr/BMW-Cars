import express from "express";
import {
  creatCar,
  deleteCarById,
  filterCars,
  getCarById,
  getCars,
  getCarsBySearch,
  updateCarById,
} from "../controllers/car.controller";

export const carRouter = express.Router();

carRouter.get("/search", getCarsBySearch);
carRouter.post("/filter", filterCars);
carRouter.get("/", getCars);
carRouter.get("/:id", getCarById);
carRouter.post("/", creatCar);
carRouter.put("/:id", updateCarById);
carRouter.delete("/:id", deleteCarById);
