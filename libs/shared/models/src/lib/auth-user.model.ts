export interface AuthUser {
  email: string;
  password: string;
}

export interface UserToken {
  accessToken: string;
}

export interface CreateAccount extends AuthUser {
  name: string;
}
