import { IsNotEmpty } from 'class-validator';

export class CreateExpenseCategoryDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
