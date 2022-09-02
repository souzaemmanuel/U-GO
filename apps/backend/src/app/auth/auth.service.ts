import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UnauthorizedError } from './errors/unauthorized.error';
import { LoginRequestBody } from './models/login-request-body';
import { UserPayload } from './models/user-payload';
import { UserToken } from './models/user-token';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService
  ) {}

  async login(user: LoginRequestBody): Promise<UserToken> {
    const loggedUser = (
      await this.userService.findByEmail(user.email)
    ).toObject() as User;

    const payload: UserPayload = {
      sub: loggedUser._id.toJSON(),
      email: loggedUser.email,
      name: loggedUser.name,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      email: user.email,
      name: loggedUser.name,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError();
  }
}
