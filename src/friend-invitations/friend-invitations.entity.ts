import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InvitationStatus } from './models/invitation-status.enum';

@Entity()
export class Invitation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((_type) => User, (user) => user.receivedInvitations, {
    eager: true,
  })
  inviteFrom: User;

  @ManyToOne((_type) => User, (user) => user.sentInvitations, {
    eager: true,
  })
  inviteTo: User;

  @Column()
  status: InvitationStatus;

  @CreateDateColumn()
  date: Date;
}
