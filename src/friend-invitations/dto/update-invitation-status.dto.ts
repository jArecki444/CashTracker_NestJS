import { IsEnum } from 'class-validator';
import { InvitationStatus } from '../models/invitation-status.enum';

export class UpdateInvitationStatusDto {
  @IsEnum(InvitationStatus)
  newInvitationStatus: InvitationStatus;
}
