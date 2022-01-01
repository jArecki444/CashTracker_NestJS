import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendInvitationsRepository } from './friend-invitations.repository';
import { User } from 'src/auth/user.entity';
import { Invitation } from './friend-invitations.entity';
import { InviteFriendDto } from './dto/invite-friend.dto';
import { UsersRepository } from 'src/auth/users.repository';
import { InvitationStatus } from './models/invitation-status.enum';
import { GetAvailableUsersDto } from './dto/get-available-users.dto';
import { FriendCategory, FriendCategoryWithData } from './models/friends-data';

@Injectable()
export class FriendInvitationsService {
  constructor(
    @InjectRepository(FriendInvitationsRepository)
    private friendInvitationsRepository: FriendInvitationsRepository,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async sendInvitation(
    inviteFriendDto: InviteFriendDto,
    inviteFromUser: User,
  ): Promise<Invitation> {
    const inviteToUser: User = await this.usersRepository.findOne({
      where: { id: inviteFriendDto.friendId },
    });

    if (!inviteToUser) {
      throw new NotFoundException(
        `InviteTo user with Id ${inviteFriendDto.friendId} not found`,
      );
    }

    return this.friendInvitationsRepository.sendInvitation(
      inviteFromUser,
      inviteToUser,
    );
  }

  async updateInvitationStatus(
    id: string,
    newInvitationStatus: InvitationStatus,
    user: User,
  ): Promise<Invitation> {
    const invitation: Invitation = await this.getInvitationById(id, user);

    if (newInvitationStatus === InvitationStatus.ACCEPTED) {
      await this.usersRepository.addFriend(
        invitation.inviteFrom,
        invitation.inviteTo,
      );
    }

    return this.friendInvitationsRepository.updateInvitationStatus(
      invitation,
      newInvitationStatus,
    );
  }

  async getInvitationById(id: string, user: User): Promise<Invitation> {
    const found = await this.friendInvitationsRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException(`Invitation with ID "${id}" not found`);
    }

    return found;
  }

  async getAllReceivedInvitations(user: User): Promise<Invitation[]> {
    return this.friendInvitationsRepository.getAllReceivedInvitations(user);
  }
  async getAllInvitations(user: User): Promise<Invitation[]> {
    return this.friendInvitationsRepository.getAllInvitations(user);
  }

  async getAvailableUsersToInvite(
    requestingUser: User,
    filterDto: GetAvailableUsersDto,
  ): Promise<any> {
    let availableToInvite = [];
    const requestingUserId = requestingUser.id;
    //Get all users
    //Get user friends
    //Return users - friends
    const allUserWithDetails = await this.usersRepository.find();
    const allUsers = allUserWithDetails.map((item) => ({
      username: item.username,
      email: item.email,
      id: item.id,
    }));

    const userFriendsWithDetails = await this.usersRepository.getUserFriends(
      requestingUserId,
    );

    if (userFriendsWithDetails.length > 0) {
      const userFriendsIds = userFriendsWithDetails.map((item) => item.id);
      availableToInvite = allUsers.filter(
        (user) => !userFriendsIds.includes(user.id),
      );
    } else {
      availableToInvite = allUsers;
    }

    availableToInvite = availableToInvite.filter(
      (user) => user.id !== requestingUserId,
    );

    const { search } = filterDto;
    if (search.length) {
      availableToInvite = availableToInvite.filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return availableToInvite;
  }

  async getFriends(user: User): Promise<User[]> {
    return await this.usersRepository.getUserFriends(user.id);
  }
  async getFriendsCategoriesWithData(user: User): Promise<FriendCategoryWithData[]> {
      let categoriesWithUsers: FriendCategoryWithData[] = [];
      const friends = {
        categoryName: FriendCategory.FRIENDS,
        users: await this.usersRepository.getUserFriends(user.id),
      }
      categoriesWithUsers.push(friends);

      const sentInvitations: FriendCategoryWithData = {
        categoryName: FriendCategory.SENT_INVITATIONS,
        usersWithInvitationInfo: await this.friendInvitationsRepository.getAllUsersThatReceivedInvitationToUser(user)
      }
      categoriesWithUsers.push(sentInvitations);

      const receivedInvitations = {
        categoryName: FriendCategory.RECEIVED_INVITATIONS,
        usersWithInvitationInfo: await this.friendInvitationsRepository.getAllUsersThatSentInvitationToUser(user)
      }
      categoriesWithUsers.push(receivedInvitations);
      return categoriesWithUsers;
    
  }
}
