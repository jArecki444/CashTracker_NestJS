import { IsEnum, IsOptional } from 'class-validator';
import { EntryStatus } from '../models/entry.status.enum';

export class GetEntriesDto {
  @IsOptional()
  @IsEnum(EntryStatus)
  status: EntryStatus;
}
