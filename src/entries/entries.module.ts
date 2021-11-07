import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersRepository } from 'src/auth/users.repository';
import { ExpensesRepository } from 'src/expenses/expenses.repository';
import { MailModule } from 'src/mail/mail.module';
import { EntriesController } from './entries.controller';
import { EntriesRepository } from './entries.repository';
import { EntriesService } from './entries.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EntriesRepository, UsersRepository, ExpensesRepository]),
    AuthModule,
    MailModule,
  ],
  controllers: [EntriesController],
  providers: [EntriesService],
})
export class EntriesModule {}
