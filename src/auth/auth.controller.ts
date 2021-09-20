import { Body, Controller, Post, Res, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDro } from './dto/user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  login(@Body() body: UserDro, @Res() res: Response) {
    this.authService.login(body, res);
  }
  @Post('/admin')
  loginAdmin(
    @Body() body,
    @Res() res: Response,
    @Session() session: { token?: string },
  ) {
    this.authService.loginAdmin(body, res, session);
  }
}
