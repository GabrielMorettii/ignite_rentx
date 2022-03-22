import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { FakeUsersRepository } from '@modules/accounts/repositories/fakes/FakeUsersRepository';
import { FakeUserTokensRepository } from '@modules/accounts/repositories/fakes/FakeUserTokensRepository';

import { DateJsProvider } from '@shared/container/providers/DateProvider/implementations/DateJsProvider';
import AppError from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let fakeUsersRepository: FakeUsersRepository;
let usersTokensRepository: FakeUserTokensRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DateJsProvider;

describe('Authenticate user', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    usersTokensRepository = new FakeUserTokensRepository();
    dateProvider = new DateJsProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      fakeUsersRepository,
      usersTokensRepository,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
  });

  it('Should be able to authenticate user', async () => {
    const user: ICreateUserDTO = {
      name: 'Gabriel',
      password: '1234',
      driver_license: '00000',
      email: 'gabrielmorettisilva@gmail.com',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('Should not be able to authenticate with non-valid user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'gabriel@teste.com.br',
        password: '123123',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });

  it('Should not be able to authenticate with wrong credentials', async () => {
    await createUserUseCase.execute({
      name: 'Gabriel',
      password: '1234',
      driver_license: '00000',
      email: 'gabrielmorettisilva@gmail.com',
    });

    await expect(
      authenticateUserUseCase.execute({
        email: 'gabrielmorettisilva@gmail.com',
        password: '123',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });
});
