import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseCategoriesModule } from './expense-categories/expense-categories.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
