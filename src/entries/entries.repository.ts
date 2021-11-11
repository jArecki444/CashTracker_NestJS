import { User } from 'src/auth/user.entity';
import { Expense } from 'src/expenses/expenses.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateEntryDto } from './dto/create-entry.dto';
import { Entry } from './entries.entity';

@EntityRepository(Entry)
export class EntriesRepository extends Repository<Entry> {
  async getAllUserEntries(user: User): Promise<Entry[]> {
    const query = this.createQueryBuilder('entry');
    query.where({ createdBy: user });

    const entries = await query.getMany();
    return entries;
  }

  async createEntry(
    createEntryDto: CreateEntryDto,
    expenses: Expense[],
    payer: User,
    partner: User,
    createdBy: User,
  ): Promise<Entry> {
    const { totalAmount, partnerAmount, additionalNote } = createEntryDto;

    const entry = this.create({
      expenses,
      payer,
      partner,
      createdBy,
      totalAmount,
      partnerAmount,
      additionalNote
    });

    await this.save(entry);
    return entry;
  }
}
