import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExpenseCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;
}
