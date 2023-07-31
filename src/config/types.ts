export type User = {
  id?: number;
  name: string;
  email: string;
};

export type Product = {
  id?: number;
  name: string;
  description: string;
  price: number;
  picture: string;
};

export type loginResponse = {
  accessToken: string;
  refreshToken: string;
};

export type Order = {
  id?: number;
  status?: string;
  userId: number;
  created_at: Date;
  updated_at: Date;
  products: string[];
};
