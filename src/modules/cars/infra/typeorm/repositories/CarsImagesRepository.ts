import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { getRepository, Repository } from 'typeorm';

import { CarImage } from '../entities/CarImage';

class CarsImagesRepository implements ICarsImagesRepository {
  repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(carImage);

    return carImage;
  }

  async removeAllImages(car_id: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .where('car_id = :id', { id: car_id })
      .execute();
  }

  async findById(car_id: string): Promise<CarImage[]> {
    const carsImages = await this.repository.find({ car_id });

    return carsImages;
  }
}

export { CarsImagesRepository };
