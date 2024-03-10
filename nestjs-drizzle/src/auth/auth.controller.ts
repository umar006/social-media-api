import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import type { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import type { SignInDto } from './dto/sign-in.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
  }

  @Public()
  @Post('register')
  async signUp(@Body() signUpDto: CreateUserDto) {
    return await this.authService.signUp(signUpDto);
  }
}
