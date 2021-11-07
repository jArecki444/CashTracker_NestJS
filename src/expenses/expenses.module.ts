import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersRepository } from 'src/auth/users.repository';
import { ExpenseCategoriesRepository } from 'src/expense-categories/expense-categories.repository';
import { ExpensesController } from './expenses.controller';
import { ExpensesRepository } from './expenses.repository';
import { ExpensesService } from './expenses.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([ExpensesRepository, UsersRepository, ExpenseCategoriesRepository]),
    AuthModule,
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
