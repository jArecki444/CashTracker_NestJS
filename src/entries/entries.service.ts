import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { User } from 'src/auth/user.entity';
import { UsersRepository } from 'src/auth/users.repository';
import { Expense } from 'src/expenses/expenses.entity';
import { ExpensesRepository } from 'src/expenses/expenses.repository';
import { In } from 'typeorm';
import { CreateEntryDto } from './dto/create-entry.dto';
import { Entry } from './entries.entity';
import { EntriesRepository } from './entries.repository';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(EntriesRepository)
    private entriesRepository: EntriesRepository,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @InjectRepository(ExpensesRepository)
    private expensesRepository: ExpensesRepository,
  ) {}

  async getEntries(user: User): Promise<Entry[]> {
    return this.entriesRepository.getAllUserEntries(user);
  }

  async getEntryById(entryId: string): Promise<Entry> {
    const found = await this.entriesRepository.findOne({
      where: { id: entryId },
    });

    if (!found) {
      throw new NotFoundException(`Entry with Id ${entryId} not found`);
    }

    return found;
  }

  async createEntry(
    createEntryDto: CreateEntryDto,
    user: User,
  ): Promise<Entry> {
    const foundPayer: User = await this.usersRepository.findOne({
      where: { id: createEntryDto.payerId },
    });
    const foundPartner: User = await this.usersRepository.findOne({
      where: { id: createEntryDto.partnerId },
    });

    // const foundExpenses = await this.expensesRepository.createQueryBuilder("expense")
    // .where("expense.id IN (:...expenseIds)", { expenseIds: ["d0595d32-cf21-4b5c-b050-4e9d01cadaab"] })
    // .getMany();

    const foundExpenses: Expense[] = await this.expensesRepository.findByIds(
      createEntryDto.expenseIds,
    );

    console.log('found expenses', foundExpenses);
    console.log('ids to find', createEntryDto.expenseIds);

    if (!foundPayer) {
      throw new NotFoundException(
        `Payer with id: ${createEntryDto.payerId} not found!`,
      );
    }

    if (!foundExpenses || foundExpenses.length === 0) {
      throw new NotFoundException(`Expenses Not Found`);
    }

    if (!foundPartner) {
      throw new NotFoundException(
        `Partner with id: ${createEntryDto.partnerId} not found!`,
      );
    }

    return this.entriesRepository.createEntry(
      createEntryDto,
      foundExpenses,
      foundPayer,
      foundPartner,
      user,
    );
  }

  //TODO: Add delete entry feature!
  // async deleteExpenseCategory(id: string, user: User): Promise<void> {
  //   const result = await this.expenseCategoriesRepository.delete({ id, user });
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`Category with id ${id} not found!`);
  //   }
  // }
}
