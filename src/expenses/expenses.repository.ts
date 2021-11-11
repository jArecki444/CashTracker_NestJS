import { User } from 'src/auth/user.entity';
import { ExpenseCategory } from 'src/expense-categories/expense-categories.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Expense } from './expenses.entity';

@EntityRepository(Expense)
export class ExpensesRepository extends Repository<Expense> {

  async getAllUserExpenses(user: User): Promise<Expense[]> {
    const query = this.createQueryBuilder('expense');
    query.where({ owner: user });

    const expenses = await query.getMany();
    return expenses;
  }

  async createExpense(
    createExpenseDto: CreateExpenseDto,
    owner: User,
    expenseCategory: ExpenseCategory

  ): Promise<Expense> {
    const {price, whim, additionalNote} = createExpenseDto;
    const expense = this.create({
      owner,
      expenseCategory,
      price,
      whim,
      additionalNote
    });
    await this.save(expense);
    return expense;
  }
}
