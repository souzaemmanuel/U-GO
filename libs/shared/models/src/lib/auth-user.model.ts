export interface AuthUser {
  email: string;
  password: string;
}

export interface UserToken {
  email: string;
  name: string;
  accessToken: string;
}

export interface CreateAccount extends AuthUser {
  name: string;
}
