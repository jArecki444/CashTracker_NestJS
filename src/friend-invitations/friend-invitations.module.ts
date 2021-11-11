import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersRepository } from 'src/auth/users.repository';
import { FriendInvitationsController } from './friend-invitations.controller';
import { FriendInvitationsRepository } from './friend-invitations.repository';
import { FriendInvitationsService } from './friend-invitations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendInvitationsRepository, UsersRepository]),
    AuthModule,
  ],
  controllers: [FriendInvitationsController],
  providers: [FriendInvitationsService],
})
export class FriendInvitationsModule {}
