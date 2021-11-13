import { IsOptional, IsString } from 'class-validator';

export class FilterExpenseCategoriesDto {
  @IsOptional()
  @IsString()
  search?: string;


  @IsOptional()
  @IsString()
  partnerId: string; //It is used for fetching cooperative categories
}
