import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { FilterExpenseCategoriesDto } from './dto/filter-expense-categories.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseCategoriesRepository } from './expense-categories.repository';
import { ExpenseCategory } from './expense-categories.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ExpenseCategoriesService {
  constructor(
    @InjectRepository(ExpenseCategoriesRepository)
    private expenseCategoriesRepository: ExpenseCategoriesRepository,
  ) {}

  async getExpenseCategories(
    filterDto: FilterExpenseCategoriesDto,
    user: User,
  ): Promise<ExpenseCategory[]> {
    return this.expenseCategoriesRepository.getExpenseCategories(
      filterDto,
      user,
    );
  }

  async getExpenseCategoryById(
    categoryId: string,
    user: User,
  ): Promise<ExpenseCategory> {
    const found = await this.expenseCategoriesRepository.findOne({
      where: { id: categoryId, user },
    });

    if (!found) {
      throw new NotFoundException(`Category with Id ${categoryId} not found`);
    }

    return found;
  }
  createExpenseCategory(
    createExpenseCategoryDto: CreateExpenseCategoryDto,
    user: User,
  ): Promise<ExpenseCategory> {
    return this.expenseCategoriesRepository.createExpenseCategory(
      createExpenseCategoryDto,
      user,
    );
  }

  async deleteExpenseCategory(id: string, user: User): Promise<void> {
    const result = await this.expenseCategoriesRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Category with id ${id} not found!`);
    }
  }
}
