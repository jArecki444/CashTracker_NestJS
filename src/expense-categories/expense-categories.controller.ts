import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { FilterExpenseCategoriesDto } from './dto/filter-expense-categories.dto';
import { ExpenseCategory } from './expense-categories.entity';
import { ExpenseCategoriesService } from './expense-categories.service';

@Controller('expense-categories')
@UseGuards(AuthGuard())
export class ExpenseCategoriesController {
  constructor(private expenseService: ExpenseCategoriesService) {}

  @Get('/:id')
  async getExpenseCategoryById(
    @Param('id') id: string,
  ): Promise<ExpenseCategory> {
    return this.expenseService.getExpenseCategoryById(id);
  }

  @Get()
  getExpenseCategories(
    @Query() filterDto: FilterExpenseCategoriesDto,
  ): Promise<ExpenseCategory[]> {
    return this.expenseService.getExpenseCategories(filterDto);
  }

  @Delete('/:id')
  deleteExpenseCategory(@Param('id') id: string): Promise<void> {
    return this.expenseService.deleteExpenseCategory(id);
  }

  @Post()
  createTask(
    @Body() createExpenseCategoryDto: CreateExpenseCategoryDto,
  ): Promise<ExpenseCategory> {
    return this.expenseService.createExpenseCategory(createExpenseCategoryDto);
  }
}
