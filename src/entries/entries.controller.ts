import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateEntryDto } from './dto/create-entry.dto';
import { Entry } from './entries.entity';
import { EntriesService } from './entries.service';

@Controller('entries')
@UseGuards(AuthGuard())
export class EntriesController {
  constructor(private entriesService: EntriesService) {}

  @Get('/:id')
  async getEntryById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Entry> {
    return this.entriesService.getEntryById(id);
  }

  @Get()
  getAllUserEntries(@GetUser() user: User): Promise<Entry[]> {
    return this.entriesService.getEntries(user);
  }

  // @Delete('/:id')
  // deleteExpenseCategory(
  //   @Param('id') id: string,
  //   @GetUser() user: User,
  // ): Promise<void> {
  //   return this.expenseService.deleteExpenseCategory(id, user);
  // }

  @Post()
  createEntry(
    @Body() createEntryDto: CreateEntryDto,
    @GetUser() user: User,
  ): Promise<Entry> {
    return this.entriesService.createEntry(
      createEntryDto,
      user,
    );
  }
}
