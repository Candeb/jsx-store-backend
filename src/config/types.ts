export type loginResponse = {
  accessToken: string;
  refreshToken: string;
  id: number;
  name: string;
  lastname: string | null;
  email: string;
};
