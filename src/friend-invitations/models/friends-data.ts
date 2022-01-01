import { User } from 'src/auth/user.entity';

export enum FriendCategory {
  FRIENDS = 'FRIENDS',
  SENT_INVITATIONS = 'SENT_INVITATIONS',
  RECEIVED_INVITATIONS = 'RECEIVED_INVITATIONS',
}

export class FriendCategoryWithData {
  categoryName: FriendCategory;
  usersWithInvitationInfo?: {
    user: User;
    invitationId: string;
  }[];
  users?: User[];
}
