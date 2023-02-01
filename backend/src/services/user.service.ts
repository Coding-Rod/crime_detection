import { faker } from "@faker-js/faker";
import { User } from "../models/user.model";
import { GetUserDTO, DeleteUserDTO, UpdateUserDTO, CreateUserDTO, LoginUserDTO, ChangePasswordDTO } from "../dtos/user.dto";

export class UserService {
    private users: User[] = this.generateUsers(10);

    constructor() {}
    
    generateUsers(amount: number): User[] {
        const users: User[] = [];
        for (let i = 0; i < amount; i++) {
            users.push({
                id: faker.datatype.uuid(),
                name: faker.name.firstName(),
                username: faker.name.firstName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                createdAt: faker.date.past(),
                updatedAt: faker.date.past(),
            });
        }
        return users;
    }

    async getUsers(): Promise<GetUserDTO[] | string> {
        try {
            const users = await Promise.resolve(this.users).then(
                (users: User[] | []) => users
            );
            const data = users.map((user) => {
                const { id, name, username, email } = user;
                return { id, name, username, email };
            });
            return data;
        } catch (err) {
            console.error(err);
            return err as string;
        }
    }

    async getUser(id: string): Promise<GetUserDTO | string> {
        try {
            const user = await Promise.resolve(this.users.find((user : User) => user.id === id)).then(
                (user: User | undefined) => user
            );
            if (!user) throw new Error("User not found");
            const { name, username, email } = user;
            return { id, name, username, email };
        } catch (err) {
            console.error(err);
            return err as string;
        }
    }
    
    async createUser(user: CreateUserDTO): Promise<GetUserDTO | string> {
        try {
            const { name, username, email, password } = user;
            const newUser = {
                id: faker.datatype.uuid(),
                name,
                username,
                email,
                password,
                createdAt: faker.date.past(),
                updatedAt: faker.date.past(),
            };
            this.users.push(newUser);
            return newUser;
        } catch (err) {
            console.error(err);
            return err as string;
        }
    }
    
    async updateUser(id: string, user: UpdateUserDTO): Promise<GetUserDTO | string> {
        try {
            const userToUpdate = await Promise.resolve(this.users.find((user) => user.id === id)).then(
                (user: User | undefined) => user
            );
            if (!userToUpdate) throw new Error("User not found");
            const { name, username, email, password } = user;
            const updatedUser = {
                id: userToUpdate.id,
                name,
                username,
                email,
                password,
                createdAt: userToUpdate.createdAt,
                updatedAt: faker.date.past(),
            };
            const userIndex = this.users.findIndex((user) => user.id === id);
            this.users[userIndex] = updatedUser;
            return updatedUser;
        } catch (err) {
            console.error(err);
            return err as string;
        }
    }
    
    async deleteUser(id: string): Promise<DeleteUserDTO | string> {
        try {
            const userToDelete = await Promise.resolve(this.users.find((user) => user.id === id)).then(
                (user: User | undefined) => user
            );
            if (!userToDelete) throw new Error("User not found");
            this.users = this.users.filter((user) => user.id !== id);
            return userToDelete;
        } catch (err) {
            console.error(err);
            return err as string;
        }
    }
    
}