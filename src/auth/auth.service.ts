import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { LoggedUserInfoDto } from './dto/logged.userInfo.dto';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: SignUpDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async getUserInfo(user: User): Promise<User> {
    return await this.usersRepository.findOne(user);
  }

  async getFriends(id: string): Promise<User[]> {
    return this.usersRepository.getUserFriends(id);
  }

  async signIn(authCredentialsDto: SignInDto): Promise<LoggedUserInfoDto> {
    const { email, password } = authCredentialsDto;

    const existingUser: User = await this.usersRepository.findOne({ email });

    if (
      existingUser &&
      (await bcrypt.compare(password, existingUser.password))
    ) {
      const { username, id } = existingUser;
      const payload: JwtPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);
      const loggedUserInfo: LoggedUserInfoDto = {
        username,
        email,
        accessToken,
        id,
      };
      return loggedUserInfo;
    } else {
      throw new UnauthorizedException('Invalid username or password');
    }
  }
}
