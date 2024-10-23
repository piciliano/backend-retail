import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<string | {}> {
    const user = await this.usersService.findByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const isPasswordValid = await compare(
      signInDto.password,
      user.password_hash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const payload = {sub: user.id, userEmail: user.email}

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
