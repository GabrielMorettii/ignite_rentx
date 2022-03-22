import { CarImage } from '../infra/typeorm/entities/CarImage';

interface ICarsImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImage>;
  removeAllImages(car_id: string): Promise<void>;
  findById(car_id: string): Promise<CarImage[]>;
}

export { ICarsImagesRepository };
