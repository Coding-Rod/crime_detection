import { User } from "../models/user.model";
import { GetUserDTO, DeleteUserDTO, UpdateUserDTO, CreateUserDTO, LoginUserDTO, ChangePasswordDTO } from "../dtos/user.dto";

import { hashPassword } from "../utils/auth/pass-hash";
import { client } from "../db/config";
import { comparePassword } from "../utils/auth/pass-hash";
import { config } from "../config";
import jwt from "jsonwebtoken";
export class UserService {
    constructor() {}

    async getUsers({ limit = 25, offset = 0 }): Promise<GetUserDTO[] | string> {
        try {
            const users = await client.query("SELECT * FROM users LIMIT $1 OFFSET $2", [limit, offset]);
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
    
    async deleteUser(id: User['id']): Promise<DeleteUserDTO | string> {
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
            const hashedPassword = await hashPassword(password);
            const newUser = {
                name,
                username,
                email,
                password: hashedPassword,
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
 
    async loginUser(user: LoginUserDTO): Promise<string> {
        try {
            const { username, password } = user;
            const userToLogin = await client.query("SELECT * FROM users WHERE username = $1", [username]);
            if (!userToLogin.rows[0]) return "Invalid credentials";
            const isValidPassword = await comparePassword(password, userToLogin.rows[0].password);
            if (!isValidPassword) return "Invalid password";
            const token = jwt.sign({ id: userToLogin.rows[0].iduser }, config.jwtSecret as string);
            return token;
        } catch (err) {
            console.error(err);
            return err as string;
        }
    }
}