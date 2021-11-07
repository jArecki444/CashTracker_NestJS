import { IsNotEmpty } from 'class-validator';
import { Expense } from '../expenses.entity';

// export interface Expense {
//   price: number;
//   ownerId: string;
//   expenseCategoryId: string;
//   whim: boolean;
// }

export class CreateExpenseDto {
  @IsNotEmpty()
  expenseCategoryId: string;

  @IsNotEmpty()
  ownerId: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  whim: boolean;
}
