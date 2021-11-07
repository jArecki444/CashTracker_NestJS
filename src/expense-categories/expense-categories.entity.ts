import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Expense } from 'src/expenses/expenses.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExpenseCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne((_type) => User, (user) => user.expenseCategories, {
    eager: false,
  })
  // @Exclude({ toPlainOnly: true })
  user: User;

  @OneToMany((_type) => Expense, (expense) => expense.expenseCategory, {
    eager: false,
  })
  expenses: Expense[];
}
