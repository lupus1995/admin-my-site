export interface SignupI {
  lastname: string;
  firstname: string;
  password: string;
  username: string;
  email: string;
}

export interface LoginI {
  usernameOrEmail: string;
  password: string;
}
