import userDAO from '../../DAO/user.DAO';
import User from '../../models/user';
import { IncorrectCredentialsError, UserNotAddedError, UserNotFoundError } from '../../errors';

class UserService {
  constructor(
    public data = userDAO,
  ) { }

  async verifyCredentials(username: string, password: string): Promise<User> {
    const isFound = await this.data.getByUsername(username);
    if(!isFound) {
      throw new UserNotFoundError();
    }
    if(password !== isFound?.password) {
      throw new IncorrectCredentialsError();
    }
    return isFound;
  }

  async registorUser(
    username: string,
    password: string,
    email: string,
  ): Promise<boolean> {
    const user = await this.data.addUser(new User(username, password, email, 'Employee', []));
    if(!user) {
      throw new UserNotAddedError();
    }
    return user;
  }
}

export default new UserService();
