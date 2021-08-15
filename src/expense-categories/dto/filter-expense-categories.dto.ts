import { IsString } from 'class-validator';

export class FilterExpenseCategoriesDto {
  @IsString()
  search: string;
}
