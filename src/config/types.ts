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
