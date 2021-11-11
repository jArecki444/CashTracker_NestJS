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
