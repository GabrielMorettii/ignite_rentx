import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let fakeCarsRepository: FakeCarsRepository;

describe('List Cars', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(fakeCarsRepository);
  });

  it('should be able to list all the available cars', async () => {
    const car = await fakeCarsRepository.create({
      name: 'Name Car',
      description: 'Desc Car',
      daily_rate: 100,
      license_plate: 'ABC-123',
      fine_amount: 40,
      brand: 'Brand',
      category_id: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all the available cars by category', async () => {
    await fakeCarsRepository.create({
      name: 'Name Car',
      description: 'Desc Car',
      daily_rate: 100,
      license_plate: 'ABC-123',
      fine_amount: 40,
      brand: 'Brand',
      category_id: 'category',
    });

    const car2 = await fakeCarsRepository.create({
      name: 'Name Car',
      description: 'Desc Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 40,
      brand: 'Brand',
      category_id: 'category2',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'category2',
    });

    expect(cars).toEqual([car2]);
  });

  it('should be able to list all the available cars by brand', async () => {
    await fakeCarsRepository.create({
      name: 'Name Car',
      description: 'Desc Car',
      daily_rate: 100,
      license_plate: 'ABC-123',
      fine_amount: 40,
      brand: 'Brand1',
      category_id: 'category',
    });

    const car2 = await fakeCarsRepository.create({
      name: 'Name Car',
      description: 'Desc Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 40,
      brand: 'Brand2',
      category_id: 'category2',
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: 'Brand2' });

    expect(cars).toEqual([car2]);
  });

  it('should be able to list all the available cars by name', async () => {
    const car = await fakeCarsRepository.create({
      name: 'Name Car1',
      description: 'Desc Car',
      daily_rate: 100,
      license_plate: 'ABC-123',
      fine_amount: 40,
      brand: 'Brand1',
      category_id: 'category',
    });

    await fakeCarsRepository.create({
      name: 'Name Car2',
      description: 'Desc Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 40,
      brand: 'Brand2',
      category_id: 'category2',
    });

    const cars = await listAvailableCarsUseCase.execute({ name: 'Name Car1' });

    expect(cars).toEqual([car]);
  });
});
