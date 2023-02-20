import { faker } from "@faker-js/faker";
import { User } from "../models/user.model";
import { GetUserDTO, DeleteUserDTO, UpdateUserDTO, CreateUserDTO, LoginUserDTO, ChangePasswordDTO } from "../dtos/user.dto";

export class UserService {
    private users: User[] = [];

    constructor() {
        this.users = [
            {
                id: faker.datatype.uuid(),
                name: faker.name.firstName(),
                username: faker.name.firstName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                createdAt: faker.date.past(),
                updatedAt: faker.date.past(),
            },
            {
                id: faker.datatype.uuid(),
                name: faker.name.firstName(),
                username: faker.name.firstName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                createdAt: faker.date.past(),
                updatedAt: faker.date.past(),
            },
            {
                id: faker.datatype.uuid(),
                name: faker.name.firstName(),
                username: faker.name.firstName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                createdAt: faker.date.past(),
                updatedAt: faker.date.past(),
            },
        ];
    }

    public getUsers(): GetUserDTO[] {
        return this.users;
    }

    public getUser(id: string): GetUserDTO {
        const user : GetUserDTO | undefined = this.users.find((user) => user.id === id);
        if (!user) throw new Error("User not found");
        else return user;
    }

    public deleteUser(id: string): DeleteUserDTO {
        const user : DeleteUserDTO | undefined = this.users.find((user) => user.id === id);
        this.users = this.users.filter((user) => user.id !== id);
        if (!user) throw new Error("User not found");
        else return user;
    }

    public updateUser(id: string, user: UpdateUserDTO): GetUserDTO {
        const userIndex = this.users.findIndex((user) => user.id === id);
        this.users[userIndex] = { ...this.users[userIndex], ...user };
        return this.users[userIndex];
    }

    public createUser(user: CreateUserDTO): User {
        const newUser: User = {
            id: faker.datatype.uuid(),
            ...user,
            createdAt: faker.date.past(),
            updatedAt: faker.date.past(),
        };
        this.users.push(newUser);
        return newUser;
    }

    public loginUser(username: LoginUserDTO['username']): LoginUserDTO {
        const user : LoginUserDTO | undefined = this.users.find((user) => user.username === username);
        if (!user) throw new Error("User not found");
        else return user;
    }

    public changePassword(id: string, user: ChangePasswordDTO): GetUserDTO {
        const userIndex = this.users.findIndex((user) => user.id === id);
        this.users[userIndex] = { ...this.users[userIndex], ...user };
        return this.users[userIndex];
    }
}