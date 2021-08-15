import { Injectable } from '@nestjs/common';
import { ExpenseCategory } from './expense-categories.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ExpenseCategoriesService {
  private expenseCategories: ExpenseCategory[] = [];

  getExpenseCategories(): ExpenseCategory[] {
    return this.expenseCategories;
  }

  createExpenseCategory(title: string, description: string): ExpenseCategory {
    const expenseCategory = {
      id: uuid(),
      title,
      description,
    };
    this.expenseCategories.push(expenseCategory);
    return expenseCategory;
  }
}
