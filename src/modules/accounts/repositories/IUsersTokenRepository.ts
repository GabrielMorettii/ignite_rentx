import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../infra/typeorm/entities/UserTokens';

interface IUsersTokenRepository {
  findByRefreshToken(refresh_token: string): Promise<UserTokens>;
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
  findByUserIdAndRefreshToken(
    id: string,
    refreshToken: string
  ): Promise<UserTokens>;
}

export { IUsersTokenRepository };
