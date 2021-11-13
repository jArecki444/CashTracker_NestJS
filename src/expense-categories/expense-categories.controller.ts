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
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { FilterExpenseCategoriesDto } from './dto/filter-expense-categories.dto';
import { ExpenseCategory } from './expense-categories.entity';
import { ExpenseCategoriesService } from './expense-categories.service';

@Controller('expense-categories')
@UseGuards(AuthGuard())
export class ExpenseCategoriesController {
  constructor(private expenseService: ExpenseCategoriesService) {}

  @Get('/my-categories')
  getMyExpenseCategories(
    @GetUser() user: User,
    @Query() filterDto: FilterExpenseCategoriesDto,
  ): Promise<ExpenseCategory[]> {
    return this.expenseService.getMyExpenseCategories(filterDto, user);
  }

  @Get('/cooperative-categories')
  getCooperativeCategories(
    @Query() filterDto: FilterExpenseCategoriesDto,
    @GetUser() user: User,
  ): Promise<ExpenseCategory[]> {
    console.log('received parter id', filterDto.partnerId);
    return this.expenseService.getCooperativeCategories(
      filterDto,
      user
    );
  }

  @Get('/:id')
  async getExpenseCategoryById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<ExpenseCategory> {
    return this.expenseService.getExpenseCategoryById(id, user);
  }
  @Delete('/:id')
  deleteExpenseCategory(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.expenseService.deleteExpenseCategory(id, user);
  }

  @Post()
  createExpenseCategory(
    @Body() createExpenseCategoryDto: CreateExpenseCategoryDto,
    @GetUser() user: User,
  ): Promise<ExpenseCategory> {
    return this.expenseService.createExpenseCategory(
      createExpenseCategoryDto,
      user,
    );
  }
}
