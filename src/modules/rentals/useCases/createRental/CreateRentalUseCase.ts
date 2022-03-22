import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DateJsProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ car_id, user_id, expected_return_date }: ICreateRentalDTO) {
    const minimumHours = 24;

    const findCarRental = await this.rentalsRepository.findRentalByCarId(
      car_id
    );

    if (findCarRental) {
      throw new AppError('This car is not available');
    }

    const findUserRental = await this.rentalsRepository.findRentalByUserId(
      user_id
    );

    if (findUserRental) {
      throw new AppError('Maximum rents reached for a unique user');
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compare < minimumHours) {
      throw new AppError('The car must be rented for at least one day');
    }

    await this.carsRepository.updateAvailable(car_id, false);

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
