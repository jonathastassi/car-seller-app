export interface Car {
  id: number;
  name: string;
  manufacturer: string;
  model: string;
  year: number;
  type: string;
  fuel: string;
  color: string;
  price: string;
  description: string;
  images: CarPhoto[];
  userId: number,
}

export interface CarPhoto {
  path: string;
}
