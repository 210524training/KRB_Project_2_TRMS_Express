export default interface User {
    username: string;
    password: string;
    email: string;
    role: Role;
    availableAmount: number;
    pendingAmount: number;
}

export type Role = 'Employee' | 'Direct Supervisor' | 'Departement Head' | 'Benefits Coordinator';