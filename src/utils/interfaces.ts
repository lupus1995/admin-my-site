export interface TokenI {
  accessToken: string;
  refreshToken: string;
}

export interface ResponseI {
  status: boolean;
  message: string;
  redirectTo?: string;
}
