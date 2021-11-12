import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signUp.dto';
@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: SignUpDto): Promise<void> {
    const { email, username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ email, username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      console.log('Sing up Error', error);
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async addFriend(inviteFrom: User, inviteTo: User): Promise<void> {
    const userToUpdate = inviteTo;

    //Set already existing friends
    userToUpdate.friends = await this.getUserFriends(userToUpdate.id);

    userToUpdate.friends.push(inviteFrom);

    await this.save(userToUpdate);
  }

  async getUserFriends(userId: string): Promise<User[]> {
    return await this.query(
      ` SELECT username,email,id
      FROM "user" U
      WHERE U.id <> $1
        AND EXISTS(
          SELECT 1
          FROM user_friends_user F
          WHERE (F."userId_1" = $1 AND F."userId_2" = U.id )
          OR (F."userId_2" = $1 AND F."userId_1" = U.id )
          );  `,
      [userId],
    );
  }
}
