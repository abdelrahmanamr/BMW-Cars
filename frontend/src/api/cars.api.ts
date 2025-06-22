import axios from "axios";
import { FilterPayload } from "../types/filter.types";

const API_URL = "http://localhost:8080/api/cars";

export const getCars = async () => {
  const res = await axios.get(`${API_URL}/`);
  return res.data;
};

export const getCarById = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const fetchCarsBySearch = async (query: any) => {
  const res = await axios.get(`${API_URL}/search?q=${query}`);
  return res.data;
};

export const deleteCarById = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const filterCars = async (filters: FilterPayload) => {
  const res = await axios.post(`${API_URL}/filter`, filters);
  return res.data;
};
