import { ICategoriesRepository, ICreateCategoryDTO } from '@modules/cars/repositories/ICategoriesRepository';
import { getRepository, Repository } from 'typeorm';

import { Category } from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({
      name,
      description,
    });

    const savedCategory = await this.repository.save(category);

    return savedCategory;
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = this.repository.findOne({ name });
    return category;
  }
}

export { CategoriesRepository };
