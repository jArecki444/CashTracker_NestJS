import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseCategoriesModule } from './expense-categories/expense-categories.module';
import { AuthModule } from './auth/auth.module';
import { ExpensesModule } from './expenses/expenses.module';
import { EntriesModule } from './entries/entries.module';

@Module({
  imports: [
    ExpenseCategoriesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'CashTracker',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ExpenseCategoriesModule,
    ExpensesModule,
    EntriesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
