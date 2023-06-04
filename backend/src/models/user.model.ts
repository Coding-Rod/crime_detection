export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    phone?: number;
    token?: string;
}