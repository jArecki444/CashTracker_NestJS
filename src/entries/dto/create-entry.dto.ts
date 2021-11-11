import { IsNotEmpty } from 'class-validator';
import { Expense } from 'src/expenses/expenses.entity';
// import { Expense } from 'src/expenses/dto/create-expense.dto';

// export interface Entry {
//   expenses: Expense;
//   payer: string;
//   createdBy: string;
//   partner: string;
//   totalAmount: number;
//   partnerAmount: number;
// }
//TODO: Check if we need this separate model instead of entity interface

export class CreateEntryDto {
  @IsNotEmpty()
  expenseIds: string[];

  @IsNotEmpty()
  payerId: string;

  @IsNotEmpty()
  partnerId: string;

  @IsNotEmpty()
  totalAmount: number;

  @IsNotEmpty()
  partnerAmount: number;

  additionalNote?: string;
}
