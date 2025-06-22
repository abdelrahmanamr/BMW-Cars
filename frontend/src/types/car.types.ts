export interface Car {
  _id: string;
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
  date: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  fastCharge_KmH?: number;
}
