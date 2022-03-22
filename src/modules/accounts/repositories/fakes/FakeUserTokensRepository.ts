import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';

import { IUsersTokenRepository } from '../IUsersTokenRepository';

class FakeUserTokensRepository implements IUsersTokenRepository {
  private repository: UserTokens[] = [];

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.repository.find(
      (userToken) => userToken.refresh_token === refresh_token
    );
  }
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.repository.push(userToken);

    return userToken;
  }
  async deleteById(id: string): Promise<void> {
    const findIndex = this.repository.findIndex(
      (userToken) => userToken.id === id
    );

    this.repository.splice(findIndex, 1);
  }
  async findByUserIdAndRefreshToken(
    id: string,
    refreshToken: string
  ): Promise<UserTokens> {
    const userToken = this.repository.find(
      (userToken) =>
        userToken.refresh_token === refreshToken && userToken.user_id === id
    );

    return userToken;
  }
}

export { FakeUserTokensRepository };
