import { Injectable, NotFoundException } from '@nestjs/common';
import { ExpenseCategory } from './expense-categories.model';
import { v4 as uuid } from 'uuid';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { FilterExpenseCategoriesDto } from './dto/filter-expense-categories.dto';

@Injectable()
export class ExpenseCategoriesService {
  private expenseCategories: ExpenseCategory[] = [];

  getAllExpenseCategories(): ExpenseCategory[] {
    return this.expenseCategories;
  }
  filterExpenseCategories(
    filterDto: FilterExpenseCategoriesDto,
  ): ExpenseCategory[] {
    let expenseCategories: ExpenseCategory[] = [];
    expenseCategories = this.expenseCategories.filter((category) => {
      if (
        category.title.includes(filterDto.search) ||
        category.description.includes(filterDto.search)
      ) {
        return true;
      }
      return false;
    });
    return expenseCategories;
  }

  getExpenseCategoryById(categoryId: string): ExpenseCategory {
    const found = this.expenseCategories.find(
      (category) => category.id === categoryId,
    );
    if (!found) {
      throw new NotFoundException(`Category with Id ${categoryId} not found`);
    }
    return found;
  }

  deleteExpenseCategory(id: string): void {
    const found = this.getExpenseCategoryById(id);
    this.expenseCategories = this.expenseCategories.filter(
      (category) => category.id !== found.id,
    );
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
