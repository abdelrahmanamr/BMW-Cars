import Car from "../models/cars.model";
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);
    if (!car) {
      res.status(404).json({ message: "Car not found!" });
      return;
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const creatCar = async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByIdAndUpdate(id, req.body);
    if (!car) {
      res.status(404).json({ message: "Car not found!" });
      return;
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) {
      res.status(404).json({ message: "Car not found!" });
      return;
    }
    res.status(200).json({ message: "Car deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCarsBySearch = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Missing search query" });
    }

    const regex = new RegExp(q, "i"); // case-insensitive regex

    const filter = {
      $or: [
        { brand: regex },
        { carModel: regex },
        { powerTrain: regex },
        { plugType: regex },
        { bodyStyle: regex },
      ],
    };

    const cars = await Car.find(filter);
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error in getCars:", error);
    res.status(500).json({ message: error.message });
  }
};

export const filterCars = async (req, res) => {
  try {
    const { filters } = req.body;
    const mongoFilter = {};

    for (const { field, operator, value } of filters) {
      if (!field || !operator) continue;

      switch (operator) {
        case "equals":
          mongoFilter[field] = value;
          break;

        case "contains":
          if (typeof value === "string") {
            mongoFilter[field] = { $regex: value, $options: "i" };
          }
          break;

        case "startsWith":
          if (typeof value === "string") {
            mongoFilter[field] = { $regex: "^" + value, $options: "i" };
          }
          break;

        case "endsWith":
          if (typeof value === "string") {
            mongoFilter[field] = { $regex: value + "$", $options: "i" };
          }
          break;

        case "isEmpty":
          mongoFilter[field] = { $in: [null, ""] };
          break;

        default:
          continue;
      }
    }

    const cars = await Car.find(mongoFilter);
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
