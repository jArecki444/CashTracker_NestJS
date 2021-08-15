import { Injectable } from '@nestjs/common';
import { ExpenseCategory } from './expense-categories.model';
import { v4 as uuid } from 'uuid';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';

@Injectable()
export class ExpenseCategoriesService {
  private expenseCategories: ExpenseCategory[] = [];

  getExpenseCategories(): ExpenseCategory[] {
    return this.expenseCategories;
  }

  createExpenseCategory(
    createExpenseCategoryDto: CreateExpenseCategoryDto,
  ): ExpenseCategory {
    const { title, description } = createExpenseCategoryDto;
    const expenseCategory = {
      id: uuid(),
      title,
      description,
    };
    this.expenseCategories.push(expenseCategory);
    return expenseCategory;
  }
}
