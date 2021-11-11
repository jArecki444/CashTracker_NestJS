import { IsNotEmpty } from 'class-validator';

export class InviteFriendDto {
  @IsNotEmpty()
  friendId: string;
}
