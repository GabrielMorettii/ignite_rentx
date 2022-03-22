import { FakeCategoriesRepository } from '@modules/cars/repositories/fakes/FakeCategoriesRepository';

import AppError from '@shared/errors/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let fakeCategoriesRepository: FakeCategoriesRepository;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create Category', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(fakeCategoriesRepository);
  });

  it('Should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category Test Description',
    };

    const response = await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryExists = await fakeCategoriesRepository.findByName(
      category.name
    );

    expect(response).toHaveProperty('id');
    expect(categoryExists).toHaveProperty('id');
  });

  it('Should not be able to create a duplicate category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category Test Description',
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    await expect(
      createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
    ).rejects.toEqual(new AppError('Category already exists!'));
  });
});
