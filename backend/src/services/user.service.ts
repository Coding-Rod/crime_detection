import { User } from "../models/user.model";
import { GetUserDTO, DeleteUserDTO, UpdateUserDTO, CreateUserDTO, LoginUserDTO, AuthUserDTO } from "../dtos/user.dto";

import { hashPassword } from "../utils/auth/pass-hash";
import { client } from "../db/config";
import { comparePassword } from "../utils/auth/pass-hash";
import { config } from "../config";

import jwt from "jsonwebtoken";
import boom from "@hapi/boom";
export class UserService {
  constructor() {}

  async getUser(id: User["id"], search: User['email'] | User['username'] | undefined = undefined): Promise<GetUserDTO | string> {    
    const user = await client.query(
      search
      ? `SELECT iduser id, name, username, email, phone FROM users WHERE username = '${search}' OR email = '${search}'`
      : `SELECT iduser id, name, username, email, phone FROM users WHERE iduser = '${id}'`
    );

    if (!user.rows[0]) throw boom.notFound("User not found");
    return user.rows[0];
  }

  async updateUser(
    id: number,
    user: UpdateUserDTO
  ): Promise<GetUserDTO | string> {
    const userToUpdate = await client.query(
      "SELECT * FROM users WHERE iduser = $1",
      [id]
    );
    if (!userToUpdate) throw boom.notFound("User not found");
    const updatedUser = {
      ...userToUpdate.rows[0],
      ...user,
    };
    const { name, username, email, password, phone } = updatedUser;


    await client.query(
      "UPDATE users SET name = $1, username = $2, email = $3, password = $4, phone = $5, updated_at = $6 WHERE iduser = $7",
      [name, username, email, password, phone, new Date(), id]
    );
    return {
      id,
      name,
      username,
      email,
      phone,
    };
  }

  async deleteUser(id: User["id"]): Promise<DeleteUserDTO | string> {
    const userToDelete = await client.query(
      "SELECT * FROM users WHERE iduser = $1",
      [id]
    );
    if (!userToDelete.rows[0]) throw boom.notFound("User not found");
    const { name } = userToDelete.rows[0];
    await client.query("DELETE FROM users WHERE iduser = $1", [id]);
    return {
      id,
      name,
    };
  }

  async createUser(user: CreateUserDTO): Promise< AuthUserDTO| string> {
    const { name, username, email, password, phone } = user;
    
    const hashedPassword = await hashPassword(password);
    const newUser = {
      name,
      username,
      email,
      phone,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await client.query(
      "INSERT INTO users (name, username, email, password, phone) VALUES ($1, $2, $3, $4, $5)",
      [
        newUser.name,
        newUser.username,
        newUser.email,
        newUser.password,
        newUser.phone,
      ]
    );
    
    const id = await parseInt(
      (
        await client.query(
          "SELECT iduser FROM users ORDER BY iduser DESC LIMIT 1"
        )
      ).rows[0].iduser
    );
    const token = jwt.sign(
      { id },
      config.jwtSecret as string
    );
    return {
      id,
      token
    };
  }

  async loginUser(user: LoginUserDTO): Promise<AuthUserDTO | string> {
    const { username, password } = user;
    const userToLogin = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (!userToLogin.rows[0]) throw boom.notFound("User not found");
    const isValidPassword = await comparePassword(
      password,
      userToLogin.rows[0].password
    );
    if (!isValidPassword) throw boom.unauthorized("Invalid password");
    const token = jwt.sign(
      { id: userToLogin.rows[0].iduser },
      config.jwtSecret as string
    );
    return {
      id: userToLogin.rows[0].iduser,
      token
    }
  }

}
