import { Module } from '@nestjs/common';
import { ExpenseCategoriesModule } from './expense-categories/expense-categories.module';

@Module({
  imports: [ExpenseCategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
