import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import AppError from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let fakeCarsRepository: ICarsRepository;

describe('Create Car', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    createCarUseCase = new CreateCarUseCase(fakeCarsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Desc Car',
      daily_rate: 100,
      license_plate: 'ABC-123',
      fine_amount: 40,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a new car with a license_plate that already exists!', async () => {
    await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Desc Car',
      daily_rate: 100,
      license_plate: 'ABC-123',
      fine_amount: 40,
      brand: 'Brand',
      category_id: 'category',
    });
    await expect(
      createCarUseCase.execute({
        name: 'Name Car2',
        description: 'Desc Car2',
        daily_rate: 102,
        license_plate: 'ABC-123',
        fine_amount: 41,
        brand: 'Brande',
        category_id: 'categoryi',
      })
    ).rejects.toEqual(new AppError('The car already exists'));
  });

  it('should be able to create a new car with true availability', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Desc Car',
      daily_rate: 100,
      license_plate: 'ABC-123',
      fine_amount: 40,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
