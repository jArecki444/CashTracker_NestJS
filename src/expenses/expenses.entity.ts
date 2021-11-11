import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Entry } from 'src/entries/entries.entity';
import { ExpenseCategory } from 'src/expense-categories/expense-categories.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    (_type) => ExpenseCategory,
    (expenseCategory) => expenseCategory,
    {
      eager: true,
    },
  )
  expenseCategory: ExpenseCategory;

  @ManyToOne((_type) => User, (user) => user.expenses, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  owner: User;

  @ManyToOne((_type) => Entry, (entry) => entry.expenses, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  entry: Entry; //TODO: Check if this relation is valid

  @Column()
  price: number;

  @Column()
  whim: boolean;
    
  @Column({nullable: true})
  additionalNote: string;

  @CreateDateColumn()
  date: Date;
}
