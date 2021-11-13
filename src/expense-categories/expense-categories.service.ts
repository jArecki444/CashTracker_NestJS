import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { FilterExpenseCategoriesDto } from './dto/filter-expense-categories.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseCategoriesRepository } from './expense-categories.repository';
import { ExpenseCategory } from './expense-categories.entity';
import { User } from 'src/auth/user.entity';
import { UsersRepository } from 'src/auth/users.repository';

@Injectable()
export class ExpenseCategoriesService {
  constructor(
    @InjectRepository(ExpenseCategoriesRepository)
    private expenseCategoriesRepository: ExpenseCategoriesRepository,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async getMyExpenseCategories(
    filterDto: FilterExpenseCategoriesDto,
    user: User,
  ): Promise<ExpenseCategory[]> {
    return await this.expenseCategoriesRepository.getMyExpenseCategories(
      filterDto,
      user,
    );
  }
  async getAllExpenseCategories(
    filterDto: FilterExpenseCategoriesDto,
  ): Promise<ExpenseCategory[]> {
    return await this.expenseCategoriesRepository.getAllExpenseCategories(
      filterDto,
    );
  }

  async getCooperativeCategories(
    filterDto: FilterExpenseCategoriesDto,
    user: User,
  ): Promise<ExpenseCategory[]> {
    const partnerId = filterDto.partnerId;
    const partner = await this.usersRepository.findOne({
      where: { id: partnerId },
    });
    return this.expenseCategoriesRepository.getCooperativeCategories(
      filterDto,
      user,
      partner,
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
