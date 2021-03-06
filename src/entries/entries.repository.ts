import { User } from 'src/auth/user.entity';
import { Expense } from 'src/expenses/expenses.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateEntryDto } from './dto/create-entry.dto';
import { GetEntriesDto } from './dto/get-entries.dto';
import { Entry } from './entries.entity';
import { EntryStatus } from './models/entry.status.enum';

@EntityRepository(Entry)
export class EntriesRepository extends Repository<Entry> {
  async getUserEntries(user: User, filterDto: GetEntriesDto): Promise<Entry[]> {
    const query = this.createQueryBuilder('entry');
    query.where({ createdBy: user }).orWhere({ partner: user });

    let entries = await query.getMany();

    if (filterDto.status) {
      entries = entries.filter(
        (entry: Entry) => entry.status === filterDto.status,
      );
    }
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
      additionalNote,
      status: EntryStatus.AWAITING_CONFIRMATION,
    });

    await this.save(entry);
    return entry;
  }

  async updateEntryStatus(
    entry: Entry,
    newStatus: EntryStatus,
  ): Promise<Entry> {
    const entryToUpdate: Entry = entry;
    entryToUpdate.status = newStatus;

    await this.save(entryToUpdate);
    return entryToUpdate;
  }
}
