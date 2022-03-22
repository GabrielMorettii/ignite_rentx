import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import { FakeSpecificationsRepository } from '@modules/cars/repositories/fakes/FakeSpecificationsRepository';

import AppError from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let fakeCarsRepository: FakeCarsRepository;
let fakeSpecificationsRepository: FakeSpecificationsRepository;

describe('Create Car Specification', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    fakeSpecificationsRepository = new FakeSpecificationsRepository();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      fakeCarsRepository,
      fakeSpecificationsRepository
    );
  });

  it('should not be able to create a new specification to a non-existent car', async () => {
    const car_id = '12314';
    const specifications_id = ['1231'];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError('The car does not exists'));
  });

  it('should be able to create a new specification to a car', async () => {
    const car = await fakeCarsRepository.create({
      name: 'Name Car',
      description: 'Desc Car',
      daily_rate: 100,
      license_plate: 'ABC-123',
      fine_amount: 40,
      brand: 'Brand',
      category_id: 'category',
    });

    const specification = await fakeSpecificationsRepository.create({
      name: 'teste',
      description: 'description teste',
    });

    const specifications_id = [specification.id];

    const specificationsCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCar).toHaveProperty('specifications');
    expect(specificationsCar.specifications.length).toEqual(1);
  });
});
