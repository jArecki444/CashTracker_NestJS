import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInDto {
  // @IsEmail()
  // @MinLength(4)
  // @MaxLength(20)
  email: string;

  // @IsString()
  // @MinLength(8)
  // @MaxLength(32)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'USER_BAD_CREDENTIALS',
  // })
  password: string;
}

// /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
// Passwords will contain at least 1 upper case letter
// Passwords will contain at least 1 lower case letter
// Passwords will contain at least 1 number or special character
// There is no length validation (min, max) in this regex!
