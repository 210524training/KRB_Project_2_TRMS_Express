export default class User {
  constructor(
    public username: string,
    public password: string,
    public email: string,
    public role: Role,
    public availableAmount: number = 1000,
    public pendingAmount: number = 0,

  ) { }
}

export type Role = 'Employee' | 'Direct Supervisor' | 'Departement Head' | 'Benefits Coordinator';
