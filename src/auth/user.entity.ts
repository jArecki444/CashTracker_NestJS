import { Exclude } from 'class-transformer';
import { Entry } from 'src/entries/entries.entity';
import { ExpenseCategory } from 'src/expense-categories/expense-categories.entity';
import { Expense } from 'src/expenses/expenses.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column({ unique: true })
  // username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  // @Column("text", { array: true })
  // friendsIds: string[]; //TODO: Think about relations

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
}
