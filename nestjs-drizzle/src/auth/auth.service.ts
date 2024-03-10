import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user =
      await this.usersService.getUserByUsernameWithPassword(username);
    if (!user) {
      throw new UnauthorizedException('username or password is wrong, bro');
    }

    const isValidated = await bcrypt.compare(pass, user.password);
    if (!isValidated) {
      throw new UnauthorizedException('username or password is wrong, bro');
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  async signUp(body: CreateUserDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltOrRounds);
    const newUser = {
      ...body,
      password: hashedPassword,
    };

    const user = await this.usersService.createUser(newUser);

    const payload = {
      sub: user.id,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
