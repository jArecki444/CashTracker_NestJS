import { IsNotEmpty } from 'class-validator';

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
