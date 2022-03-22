import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';
import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository';
import { getRepository, Repository } from 'typeorm';

class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  public async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const UserTokens = this.repository.findOne({
      refresh_token,
    });

    return UserTokens;
  }

  public async findByUserIdAndRefreshToken(
    id: string,
    refreshToken: string
  ): Promise<UserTokens> {
    const user = await this.repository.findOne({
      where: { user_id: id, refresh_token: refreshToken },
    });

    return user;
  }

  public async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const UserTokens = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(UserTokens);

    return UserTokens;
  }

  public async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersTokenRepository };
