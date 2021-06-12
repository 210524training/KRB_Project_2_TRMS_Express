import Reimbursement from './reimbursement';

export default class User {
  constructor(
    public username: string,
    public password: string,
    public email: string,
    public role: Role,
    public bin: Reimbursement[],

  ) { }
}

export type Role = 'Employee' | 'Direct Supervisor' | 'Departement Head' | 'Benefits Coordinator';
