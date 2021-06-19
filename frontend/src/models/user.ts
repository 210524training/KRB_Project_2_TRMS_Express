import Reimbursement from './reimbursement';

export default interface User {
    username: string;
    password: string;
    email: string;
    role: Role;
    bin?: Reimbursement[];
}

export type Role = 'Employee' | 'Direct Supervisor' | 'Departement Head' | 'Benefits Coordinator';