import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('autenticate')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
