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
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Expense } from './expenses.entity';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
@UseGuards(AuthGuard())
export class ExpensesController {
  constructor(private expenseService: ExpensesService) {}

  @Get('/:id')
  async getExpenseById(@Param('id') id: string): Promise<Expense> {
    return this.expenseService.getExpenseById(id);
  }

  @Get()
  getAllMyExpenses(@GetUser() user: User): Promise<Expense[]> {
    return this.expenseService.getAllUserExpenses(user);
  }

  @Post()
  createExpense(
    @Body() createExpenseDto: CreateExpenseDto,
    @GetUser() user: User,
  ): Promise<Expense> {
    return this.expenseService.createExpense(createExpenseDto, user);
  }

  //TODO: Add Delete expense feature!
  // @Delete('/:id')
  // deleteExpenseCategory(
  //   @Param('id') id: string,
  //   @GetUser() user: User,
  // ): Promise<void> {
  //   return this.expenseService.deleteExpenseCategory(id, user);
  // }
}
