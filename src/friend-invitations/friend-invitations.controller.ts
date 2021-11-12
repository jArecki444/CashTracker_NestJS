import {
  Body,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { GetAvailableUsersDto } from './dto/get-available-users.dto';
import { InviteFriendDto } from './dto/invite-friend.dto';
import { UpdateInvitationStatusDto } from './dto/update-invitation-status.dto';
import { Invitation } from './friend-invitations.entity';
import { FriendInvitationsService } from './friend-invitations.service';

@Controller('friend-invitations')
@UseGuards(AuthGuard())
export class FriendInvitationsController {
  constructor(private friendInvitationsService: FriendInvitationsService) {}

  @Get('/received-invitations')
  getMyReceivedInvitations(@GetUser() user: User): Promise<Invitation[]> {
    return this.friendInvitationsService.getAllReceivedInvitations(user);
  }

  @Get('/all-invitations')
  getMyAllInvitations(@GetUser() user: User): Promise<Invitation[]> {
    return this.friendInvitationsService.getAllInvitations(user);
  }

  @Get('/available-to-invite')
  availableToInvite(
    @Query() filterDto: GetAvailableUsersDto,
    @GetUser() user: User,
  ): Promise<[{ username: string; email: string; id: string }]> {
    return this.friendInvitationsService.getAvailableUsersToInvite(user, filterDto);
  }

  @Get('/:id')
  async getInvitationId(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Invitation> {
    return this.friendInvitationsService.getInvitationById(id, user);
  }

  @Post()
  sendInvitation(
    @Body() inviteFriendDto: InviteFriendDto,
    @GetUser() user: User,
  ): Promise<Invitation> {
    return this.friendInvitationsService.sendInvitation(inviteFriendDto, user);
  }

  @Patch('/:id/status')
  updateInvitationStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateInvitationStatusDto,
    @GetUser() user: User,
  ): Promise<Invitation> {
    const { newInvitationStatus } = updateTaskStatusDto;
    return this.friendInvitationsService.updateInvitationStatus(
      id,
      newInvitationStatus,
      user,
    );
  }
}
