import userDAO from '../../DAO/user.DAO';
import User from '../../models/user';
import { IncorrectCredentialsError, UserNotFoundError } from '../../errors';

class UserService {
  constructor(
    public data = userDAO,
  ) { }

  async verifyCredentials(username: string, password: string): Promise<User> {

    const isFound = await this.data.getByUsername(username);
    if (!isFound) {
      throw new UserNotFoundError();
    }
    if (password === isFound?.password) {
      return isFound;
    }
    throw new IncorrectCredentialsError();
  }
}

export default new UserService();
