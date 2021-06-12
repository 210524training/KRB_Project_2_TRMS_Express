import userDAO from '../../DAO/user.DAO';
import User from '../../models/user';

class UserService {
  constructor(
    public data = userDAO,
  ) {}

  async verifyCredentials(username: string, password: string): Promise<User> {
    const isFound = await this.data.getByUsername(username);

    if(password === isFound?.password) {
      return isFound;
    }
    throw new Error('Credentials are incorrect.');
  }
}

export default new UserService();
