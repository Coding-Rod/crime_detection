import { faker } from "@faker-js/faker";
import { User } from "../models/user.model";
import { GetUserDTO, DeleteUserDTO, UpdateUserDTO, CreateUserDTO, LoginUserDTO, ChangePasswordDTO } from "../dtos/user.dto";
import { hashPassword } from "../utils/auth/pass-hash";
import { client } from "../db/config";
export class UserService {
    private users: User[] = this.generateUsers(10);

    constructor() {}
    
    generateUsers(amount: number): User[] {
        const users: User[] = [];
        for (let i = 0; i < amount; i++) {
            users.push({
                id: faker.datatype.number(),
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
            const users = await client.query("SELECT * FROM users");
            return users.rows;
        } catch (err) {
            console.error(err);
            return err as string;
        }
    }

    async getUser(id: number): Promise<GetUserDTO | string> {
        try {
            const user = await client.query("SELECT * FROM users WHERE iduser = $1", [id]);
            return user.rows[0];
        } catch (err) {
            console.error(err);
            return err as string;
        }
    }

    async updateUser(id: number, user: UpdateUserDTO): Promise<GetUserDTO | string> {
        try {
            const userToUpdate = await client.query("SELECT * FROM users WHERE iduser = $1", [id]);
            if (!userToUpdate) throw new Error("User not found");
            const updatedUser = {
                ...userToUpdate.rows[0],
                ...user,
            };
            const { name, username, email, password } = updatedUser;
            await client.query(
                "UPDATE users SET name = $1, username = $2, email = $3, password = $4, updated_at = $5 WHERE iduser = $6",
                [name, username, email, password, new Date(), id]
            );
            return {
                id,
                name,
                username,
                email,
            };
        } catch (err) {
            console.error(err);
            return err as string;
        }
    }
    
    async deleteUser(id: number): Promise<DeleteUserDTO | string> {
        try {
            const userToDelete = await client.query("SELECT * FROM users WHERE iduser = $1", [id]);
            if (!userToDelete.rows[0]) throw new Error("User not found");
            const { name } = userToDelete.rows[0];
            await client.query("DELETE FROM users WHERE iduser = $1", [id]);
            return {
                id,
                name,
            };
        } catch (err) {
            console.error(err);
            return err as string;
        }
    }

    async createUser(user: CreateUserDTO): Promise<GetUserDTO | string> {
        try {
            const { name, username, email, password } = user;
            const newUser = {
                name,
                username,
                email,
                password,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            await client.query(
                "INSERT INTO users (name, username, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)",
                [newUser.name, newUser.username, newUser.email, newUser.password, newUser.createdAt, newUser.updatedAt]
            );
            const id = await parseInt((await client.query("SELECT iduser FROM users ORDER BY iduser DESC LIMIT 1")).rows[0].iduser);
            return {
                id,
                name,
                username,
                email
            }
        } catch (err) {
            console.error(err);
            return err as string;
        }
    }
    
    async loginUser(user: LoginUserDTO): Promise<GetUserDTO | string> {
        try {
            const { username, password } = user;
            const userToLogin = await client.query("SELECT * FROM users WHERE username = $1", [username]);
            if (!userToLogin.rows[0]) throw new Error("User not found");
            const { idUser, name, email } = userToLogin.rows[0];
            if (password !== userToLogin.rows[0].password) throw new Error("Password incorrect");
            return {
                id: idUser,
                name,
                username,
                email
            }
        } catch (err) {
            console.error(err);
            return err as string;
        }
    }

    
}