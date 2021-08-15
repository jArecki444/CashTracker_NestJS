import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseCategoriesController } from './expense-categories.controller';
import { ExpenseCategoriesRepository } from './expense-categories.repository';
import { ExpenseCategoriesService } from './expense-categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseCategoriesRepository])],
  controllers: [ExpenseCategoriesController],
  providers: [ExpenseCategoriesService],
})
export class ExpenseCategoriesModule {}
