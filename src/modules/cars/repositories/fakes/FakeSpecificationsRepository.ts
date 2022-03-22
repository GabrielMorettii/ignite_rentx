import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class FakeSpecificationsRepository implements ISpecificationsRepository {
  repository: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.repository.push(specification);

    return specification;
  }
  async list(): Promise<Specification[]> {
    return this.repository;
  }
  async findByName(name: string): Promise<Specification> {
    return this.repository.find((specification) => specification.name === name);
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.repository.filter((specification) =>
      ids.includes(specification.id)
    );

    return specifications;
  }
}

export { FakeSpecificationsRepository };
