import { Body, Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { ExpenseCategory } from './expense-categories.model';
import { ExpenseCategoriesService } from './expense-categories.service';

@Controller('expense-categories')
export class ExpenseCategoriesController {
  constructor(private expenseService: ExpenseCategoriesService) {}

  @Get()
  getAllExpenseCategories(): ExpenseCategory[] {
    return this.expenseService.getExpenseCategories();
  }

  @Post()
  createTask(
    @Body() createExpenseCategoryDto: CreateExpenseCategoryDto,
  ): ExpenseCategory {
    return this.expenseService.createExpenseCategory(createExpenseCategoryDto);
  }
}
