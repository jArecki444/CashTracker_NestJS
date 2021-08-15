import { EntityRepository, Repository } from 'typeorm';
import { ExpenseCategory } from './expense-categories.entity';

@EntityRepository()
export class ExpenseCategoriesRepository extends Repository<ExpenseCategory> {}
