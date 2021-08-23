import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { FilterExpenseCategoriesDto } from './dto/filter-expense-categories.dto';
import { ExpenseCategory } from './expense-categories.entity';

@EntityRepository(ExpenseCategory)
export class ExpenseCategoriesRepository extends Repository<ExpenseCategory> {
  async getExpenseCategories(
    filterDto: FilterExpenseCategoriesDto,
    user: User,
  ): Promise<ExpenseCategory[]> {
    const { search } = filterDto;

    const query = this.createQueryBuilder('expenseCategory');
    query.where({ user });

    if (search) {
      query.andWhere(
        '(LOWER(expenseCategory.title) LIKE LOWER(:search) OR LOWER(expenseCategory.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const expenseCategories = await query.getMany();
    return expenseCategories;
  }

  async createExpenseCategory(
    createExpenseCategoryDto: CreateExpenseCategoryDto,
    user: User,
  ): Promise<ExpenseCategory> {
    const { title, description } = createExpenseCategoryDto;
    const expenseCategory = this.create({
      title,
      description,
      user,
    });
    await this.save(expenseCategory);
    return expenseCategory;
  }
}
