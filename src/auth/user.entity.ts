import { ExpenseCategory } from 'src/expense-categories/expense-categories.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((_type) => ExpenseCategory, (task) => task.user, { eager: true })
  expenseCategories: ExpenseCategory[];
}
