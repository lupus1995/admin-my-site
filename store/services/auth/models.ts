export interface SignUpI {
  username: string;
  password: string;
  confirmPassoword: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface SignInI {
  username: string;
  password: string;
}
