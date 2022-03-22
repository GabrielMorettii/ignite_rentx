import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { Repository, getRepository } from 'typeorm';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    id,
    car_id,
    user_id,
    expected_return_date,
    end_date,
    total,
    updated_at,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      id,
      car_id,
      user_id,
      expected_return_date,
      end_date,
      total,
      updated_at,
    });

    await this.repository.save(rental);

    return rental;
  }
  async findRentalByCarId(car_id: string): Promise<Rental> {
    const rental = await this.repository
      .createQueryBuilder('rental')
      .where('rental.car_id = :car_id AND rental.end_date IS NULL', { car_id })
      .getOne();

    return rental;
  }
  async findRentalByUserId(user_id: string): Promise<Rental> {
    const rental = await this.repository
      .createQueryBuilder()
      .where('user_id = :user_id AND end_date IS NULL', { user_id })
      .getOne();

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ id });

    return rental;
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { user_id },
      relations: ['car'],
    });

    return rentals;
  }
}

export { RentalsRepository };
