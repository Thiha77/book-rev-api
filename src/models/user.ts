export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    isAdmin: boolean;
    isActive: boolean;
}