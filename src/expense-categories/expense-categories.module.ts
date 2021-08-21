import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ExpenseCategoriesController } from './expense-categories.controller';
import { ExpenseCategoriesRepository } from './expense-categories.repository';
import { ExpenseCategoriesService } from './expense-categories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpenseCategoriesRepository]),
    AuthModule,
  ],
  controllers: [ExpenseCategoriesController],
  providers: [ExpenseCategoriesService],
})
export class ExpenseCategoriesModule {}
