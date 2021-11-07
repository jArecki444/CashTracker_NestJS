import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpensesRepository } from './expenses.repository';
import { User } from 'src/auth/user.entity';
import { Expense } from './expenses.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpenseCategory } from 'src/expense-categories/expense-categories.entity';
import { ExpenseCategoriesRepository } from 'src/expense-categories/expense-categories.repository';
import { UsersRepository } from 'src/auth/users.repository';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(ExpensesRepository)
    private expensesRepository: ExpensesRepository,
    @InjectRepository(ExpenseCategoriesRepository)
    private expenseCategoriesRepository: ExpenseCategoriesRepository,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async getAllUserExpenses(user: User): Promise<Expense[]> {
    return this.expensesRepository.getAllUserExpenses(user);
  }

  async getExpenseById(expenseId: string): Promise<Expense> {
    const found = await this.expensesRepository.findOne({
      where: { id: expenseId },
    });

    if (!found) {
      throw new NotFoundException(`Expense with Id ${expenseId} not found`);
    }

    return found;
  }

  async createExpense(
    createExpenseDto: CreateExpenseDto,
    user: User,
  ): Promise<Expense> {
    const foundCategory: ExpenseCategory =
      await this.expenseCategoriesRepository.findOne({
        where: { id: createExpenseDto.expenseCategoryId },
      });

    if (!foundCategory) {
      throw new NotFoundException(
        `Expense category with Id ${createExpenseDto.expenseCategoryId} not found`,
      );
    }

    const foundOwner: User = await this.usersRepository.findOne({
      where: { id: createExpenseDto.ownerId },
    });

    if (!foundOwner) {
      throw new NotFoundException(
        `Owner with Id ${createExpenseDto.ownerId} not found`,
      );
    }

    return this.expensesRepository.createExpense(
      createExpenseDto,
      foundOwner,
      foundCategory,
    );
  }

  // async deleteExpenseCategory(id: string, user: User): Promise<void> {
  //   const result = await this.expenseCategoriesRepository.delete({ id, user });
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`Category with id ${id} not found!`);
  //   }
  // }
}
