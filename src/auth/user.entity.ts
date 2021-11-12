import { Exclude } from 'class-transformer';
import { Entry } from 'src/entries/entries.entity';
import { ExpenseCategory } from 'src/expense-categories/expense-categories.entity';
import { Expense } from 'src/expenses/expenses.entity';
import { Invitation } from 'src/friend-invitations/friend-invitations.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany((_type) => Invitation, (invitation) => invitation.inviteFrom, {
    eager: false,
  })
  receivedInvitations: Invitation[];

  @OneToMany((_type) => Invitation, (invitation) => invitation.inviteTo, {
    eager: false,
  })
  sentInvitations: Invitation[];

  @OneToMany(
    (_type) => ExpenseCategory,
    (expenseCategory) => expenseCategory.user,
    { eager: false },
  )
  expenseCategories: ExpenseCategory[];

  @OneToMany((_type) => Entry, (entry) => entry.createdBy, { eager: false })
  entries: Entry[];

  @OneToMany((_type) => Expense, (expense) => expense.owner, { eager: false })
  expenses: Expense[];

  @ManyToMany((type) => User)
  @JoinTable()
  friends: User[];
}
