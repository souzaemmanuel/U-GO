export interface UserPayload {
  email: string;
  name: string;
  sub?: string;
  iat?: number;
  exp?: number;
}
