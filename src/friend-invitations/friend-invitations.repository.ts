import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Invitation } from './friend-invitations.entity';
import { InvitationStatus } from './models/invitation-status.enum';

@EntityRepository(Invitation)
export class FriendInvitationsRepository extends Repository<Invitation> {
  async getAllReceivedInvitations(user: User): Promise<Invitation[]> {
    const query = this.createQueryBuilder('invitation');
    query
      .where({ inviteTo: user, status: InvitationStatus.PENDING })
      .select(['invitation.date', 'invitation.status', 'invitation.id'])
      .leftJoinAndSelect('invitation.inviteFrom', 'username');

    const invitations = await query.getMany();
    return invitations;
  }

  async getAllInvitations(user: User): Promise<Invitation[]> {
    const query = this.createQueryBuilder('invitation');
    query.where({ inviteFrom: user }).orWhere({ inviteTo: user });

    const invitations = await query.getMany();
    return invitations;
  }

  //get all users that sent invitation to user (RECEIVED INVITATIONS)
  async getAllUsersThatSentInvitationToUser(
    user: User,
  ): Promise<{ user: User; invitationId: string }[]> {
    const query = this.createQueryBuilder('invitation');
    query
      .where({ inviteTo: user, status: InvitationStatus.PENDING })
      .leftJoinAndSelect('invitation.inviteFrom', 'username');
    const invitations = await query.getMany();
    const users = invitations.map((invitation) => ({
      user: invitation.inviteFrom,
      invitationId: invitation.id,
    }));
    return users;
  }
  //get all users that received invitation from user (SENT INVITATIONS)
  async getAllUsersThatReceivedInvitationToUser(user: User): Promise<{ user: User; invitationId: string }[]> {
    const query = this.createQueryBuilder('invitation');
    query
      .where({ inviteFrom: user, status: InvitationStatus.PENDING })
      .leftJoinAndSelect('invitation.inviteTo', 'username');
    const invitations = await query.getMany();
    const users = invitations.map((invitation) => ({
      user: invitation.inviteTo,
      invitationId: invitation.id,
    }));
    return users;
  }

  async sendInvitation(inviteFrom: User, inviteTo: User): Promise<Invitation> {
    const invitation: Invitation = this.create({
      inviteFrom,
      inviteTo,
      status: InvitationStatus.PENDING,
    });

    await this.save(invitation);
    return invitation;
  }

  async updateInvitationStatus(
    invitation: Invitation,
    newStatus: InvitationStatus,
  ): Promise<Invitation> {
    const updatedInvitation: Invitation = invitation;
    updatedInvitation.status = newStatus;

    await this.save(updatedInvitation);
    return updatedInvitation;
  }
}
