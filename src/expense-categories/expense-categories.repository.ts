import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { FilterExpenseCategoriesDto } from './dto/filter-expense-categories.dto';
import { ExpenseCategory } from './expense-categories.entity';

@EntityRepository(ExpenseCategory)
export class ExpenseCategoriesRepository extends Repository<ExpenseCategory> {
  async getAllExpenseCategories(
    filterDto: FilterExpenseCategoriesDto,
  ): Promise<ExpenseCategory[]> {
    const { search } = filterDto;

    let expenseCategories = await this.find();

    if (search) {
      expenseCategories = expenseCategories.filter((expenseCategory) =>
        expenseCategory.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return expenseCategories;
  }

  async getMyExpenseCategories(
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

  async getCooperativeCategories(
    filterDto: FilterExpenseCategoriesDto,
    user: User,
    partner: User,
  ): Promise<ExpenseCategory[]> {
    const { search } = filterDto;

    const query = this.createQueryBuilder('expenseCategory');
    console.log('partner to query', partner);
    query.where({ user: user }).orWhere({ user: partner });
    let expenseCategories = await query.getMany();

    if (search) {
      // query.andWhere(
      //   '(LOWER(expenseCategory.title) LIKE LOWER(:search) OR LOWER(expenseCategory.description) LIKE LOWER(:search))',
      //   { search: `%${search}%` },
      // );
      expenseCategories = expenseCategories.filter((expenseCategory) =>
        expenseCategory.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

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
