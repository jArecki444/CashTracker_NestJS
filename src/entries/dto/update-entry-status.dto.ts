import { IsEnum } from 'class-validator';
import { EntryStatus } from '../models/entry.status.enum';

export class UpdateEntryStatusDto {
  @IsEnum(EntryStatus)
  newEntryStatus: EntryStatus;
}
