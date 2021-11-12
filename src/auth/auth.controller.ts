import { Body, Get, Param, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoggedUserInfoDto } from './dto/logged.userInfo.dto';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: SignUpDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body() authCredentialsDto: SignInDto): Promise<LoggedUserInfoDto> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get('/info')
  info(@GetUser() user: User): Promise<User> {
    return this.authService.getUserInfo(user);
  }

  @Get('/friends/:userId')
  friends(@Param('userId') id: string): Promise<User[]> {
    return this.authService.getFriends(id);
  }
}
