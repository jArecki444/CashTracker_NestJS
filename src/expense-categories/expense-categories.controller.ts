import { Body, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { FilterExpenseCategoriesDto } from './dto/filter-expense-categories.dto';
import { ExpenseCategory } from './expense-categories.model';
import { ExpenseCategoriesService } from './expense-categories.service';

@Controller('expense-categories')
export class ExpenseCategoriesController {
  constructor(private expenseService: ExpenseCategoriesService) {}

  @Get()
  getExpenseCategories(
    @Query() filterDto: FilterExpenseCategoriesDto,
  ): ExpenseCategory[] {
    if (Object.keys(filterDto).length) {
      return this.expenseService.filterExpenseCategories(filterDto);
    } else {
      return this.expenseService.getAllExpenseCategories();
    }
  }

  @Get('/:id')
  getExpenseCategoryById(@Param('id') id: string): ExpenseCategory {
    return this.expenseService.getExpenseCategoryById(id);
  }

  @Delete('/:id')
  deleteExpenseCategory(@Param('id') id: string): void {
    return this.expenseService.deleteExpenseCategory(id);
  }

  @Post()
  createTask(
    @Body() createExpenseCategoryDto: CreateExpenseCategoryDto,
  ): ExpenseCategory {
    return this.expenseService.createExpenseCategory(createExpenseCategoryDto);
  }
}
