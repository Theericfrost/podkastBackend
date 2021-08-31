import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDro } from './dto/user.dto';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async login(user: UserDro, response: Response) {
    try {
      const userLogIn = await this.checkUser(user);
      if (userLogIn) {
        response
          .status(200)
          .send({ status: 200, data: await this.generateToken(userLogIn) });
      }
    } catch (e) {
      response.status(403).send(e);
    }
  }

  async generateToken(user: UserDro) {
    const payload = { login: user.login, password: user.password };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async checkUser(user: UserDro) {
    const { login, password } = user;
    const userFromBd = await this.model.findOne().where('login').equals(login);
    if (password === userFromBd.password) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некоректный email или пароль',
    });
  }
}
