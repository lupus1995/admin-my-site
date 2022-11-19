export interface TokenI {
  accessToken: string;
  refreshToken: string;
}

export interface ResponseI<T = void> {
  status: boolean;
  message?: string;
  redirectTo?: string;
  responseBody?: T;
}
