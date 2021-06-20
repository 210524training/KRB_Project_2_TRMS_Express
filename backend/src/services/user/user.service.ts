import userDAO from '../../DAO/user.DAO';
import User from '../../models/user';
import { IncorrectCredentialsError, UserNotAddedError, UserNotFoundError } from '../../errors';
import Reimbursement from '../../models/reimbursement';
import reimbursementDAO from '../../DAO/reimbursement.DAO';

class UserService {
  constructor(
    public data = userDAO,
    public Rdata = reimbursementDAO,
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
    const user = await this.data.addUser(new User(username, password, email, 'Employee'));
    if(!user) {
      throw new UserNotAddedError();
    }
    return user;
  }

  async getUserRequests(username: string): Promise<Reimbursement[]> {
    const requests = await this.Rdata.getAllReimbursementRequestsByUsername(username);
    return requests as Reimbursement[];
  }
}

export default new UserService();
