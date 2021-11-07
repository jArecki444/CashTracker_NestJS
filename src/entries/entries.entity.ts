import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Expense } from 'src/expenses/expenses.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Entry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //One Entry is collection of expenses
  @OneToMany((_type) => Expense, (expense) => expense.entry, { eager: true })
  expenses: Expense[];

  @ManyToOne((_type) => User, (user) => user.id, {
    eager: true,
  })
  payer: User;

  @ManyToOne((_type) => User, (user) => user.id, {
    eager: true,
  })
  createdBy: User;

  @ManyToOne((_type) => User, (user) => user.id, {
    eager: true,
  })
  partner: User;

  @Column()
  totalAmount: number;

  @Column()
  partnerAmount: number;

  @CreateDateColumn()
  date: Date;
}
