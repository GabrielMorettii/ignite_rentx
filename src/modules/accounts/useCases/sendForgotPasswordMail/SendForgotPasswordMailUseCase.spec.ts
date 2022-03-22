import { FakeUsersRepository } from '@modules/accounts/repositories/fakes/FakeUsersRepository';
import { FakeUserTokensRepository } from '@modules/accounts/repositories/fakes/FakeUserTokensRepository';

import { DateJsProvider } from '@shared/container/providers/DateProvider/implementations/DateJsProvider';
import { FakeMailProvider } from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeUsersRepository: FakeUsersRepository;
let dateProvider: DateJsProvider;
let mailProvider: FakeMailProvider;

describe('Send Forgot Email', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    dateProvider = new DateJsProvider();
    mailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      fakeUserTokensRepository,
      fakeUsersRepository,
      dateProvider,
      mailProvider
    );
  });

  it('should be able to send a forgot password email to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Jon doe',
      email: 'jondoe@gmail.com',
      driver_license: 'ABC-123',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('jondoe@gmail.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send a forgot password email to an invalid user', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('jonathan@gmail.com')
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to create a users token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'create');

    await fakeUsersRepository.create({
      name: 'Jon doe',
      email: 'jondoe@gmail.com',
      driver_license: 'ABC-123',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('jondoe@gmail.com');

    expect(generateToken).toHaveBeenCalled();
  });
});
