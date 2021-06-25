import userDAO from '../../DAO/user.DAO';
import User from '../../models/user';
import { IncorrectCredentialsError, UserNotAddedError, UserNotFoundError } from '../../errors';
import Reimbursement from '../../models/reimbursement';
import reimbursementDAO from '../../DAO/reimbursement.DAO';
import endOfYear from 'date-fns/endOfYear';
import endOfDay from 'date-fns/endOfDay';
import endOfSecond from 'date-fns/endOfSecond'

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

  async getUserRequests(username: User): Promise<Reimbursement[]> {
    const requests = await this.Rdata.getAllReimbursementRequestsByUsername(username);
    return requests as Reimbursement[];
  }

  async resetAllReimbursementsAmounts() {
    const users: User[] = await this.data.getAll();

    users.forEach( async (user) => {
      await this.data.updateReimbursementAmounts(user.username, 1000);
    })
  }

  async updateAvailableAmount(username: string, amount: number): Promise<void> {
    const update = await this.data.updateReimbursementAmounts(username, amount);
  }

  // eslint-disable-next-line class-methods-use-this
  shouldResetReimbursementAmount() {
    if(endOfDay(Date.now()).getTime() === endOfYear(Date.now()).getTime()) {
      this.resetAllReimbursementsAmounts();
    } 
  }
}

export default new UserService();
