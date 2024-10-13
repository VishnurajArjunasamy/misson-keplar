export interface ProductCategory {
  id: string;
  photo: string;
  category: string;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  photo: string;
  guarantee: number;
  rating: number;
  price: string;
  description: string;
}
