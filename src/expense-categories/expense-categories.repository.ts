import { EntityRepository, Repository } from 'typeorm';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { FilterExpenseCategoriesDto } from './dto/filter-expense-categories.dto';
import { ExpenseCategory } from './expense-categories.entity';

@EntityRepository(ExpenseCategory)
export class ExpenseCategoriesRepository extends Repository<ExpenseCategory> {
  async getExpenseCategories(
    filterDto: FilterExpenseCategoriesDto,
  ): Promise<ExpenseCategory[]> {
    const { search } = filterDto;

    const query = this.createQueryBuilder('expenseCategory');

    if (search) {
      query.andWhere(
        'LOWER(expenseCategory.title) LIKE LOWER(:search) OR LOWER(expenseCategory.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const expenseCategories = await query.getMany();
    return expenseCategories;
  }

  async createExpenseCategory(
    createExpenseCategoryDto: CreateExpenseCategoryDto,
  ): Promise<ExpenseCategory> {
    const { title, description } = createExpenseCategoryDto;
    const expenseCategory = this.create({
      title,
      description,
    });
    await this.save(expenseCategory);
    return expenseCategory;
  }
}
