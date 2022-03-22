import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import { FakeRentalsRepository } from '@modules/rentals/repositories/fakes/FakeRentalsRepository';
import dayjs from 'dayjs';

import { DateJsProvider } from '@shared/container/providers/DateProvider/implementations/DateJsProvider';
import AppError from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let fakeRentalsRepository: FakeRentalsRepository;
let createRentalUseCase: CreateRentalUseCase;
let fakeCarsRepository: FakeCarsRepository;
let dateJsProvider: DateJsProvider;

describe('Create Rental', () => {
  const add24HoursToDate = dayjs().add(25, 'hours').toDate();

  beforeEach(() => {
    fakeRentalsRepository = new FakeRentalsRepository();
    dateJsProvider = new DateJsProvider();
    fakeCarsRepository = new FakeCarsRepository();
    createRentalUseCase = new CreateRentalUseCase(
      fakeRentalsRepository,
      dateJsProvider,
      fakeCarsRepository
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await fakeCarsRepository.create({
      name: 'Name Car',
      description: 'Desc Car',
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 40,
      brand: 'Brand',
      category_id: 'category',
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '121212',
      expected_return_date: add24HoursToDate,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental when the car is already booked', async () => {
    await fakeRentalsRepository.create({
      car_id: '1234',
      user_id: '121212',
      expected_return_date: add24HoursToDate,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: '1234',
        user_id: '1212125',
        expected_return_date: add24HoursToDate,
      })
    ).rejects.toEqual(new AppError('This car is not available'));
  });

  it('should not be able to create a new rental when the user already booked another car', async () => {
    await fakeRentalsRepository.create({
      car_id: '1234',
      user_id: 'testUser',
      expected_return_date: add24HoursToDate,
    });
    await expect(
      createRentalUseCase.execute({
        car_id: '12345',
        user_id: 'testUser',
        expected_return_date: add24HoursToDate,
      })
    ).rejects.toEqual(new AppError('Maximum rents reached for a unique user'));
  });

  it('should not be able to create a new rental with duration minor than 24hours', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: '1234',
        user_id: 'testUser',
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(
      new AppError('The car must be rented for at least one day')
    );
  });
});
