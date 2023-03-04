import { User } from "../models/user.model";
import { GetUserDTO, DeleteUserDTO, UpdateUserDTO, CreateUserDTO, LoginUserDTO, AuthUserDTO } from "../dtos/user.dto";

import { hashPassword } from "../utils/auth/pass-hash";
import { client } from "../db/config";
import { comparePassword } from "../utils/auth/pass-hash";
import { config } from "../config";
import unique from "../utils/db/unique";

import jwt from "jsonwebtoken";
import boom from "@hapi/boom";
export class UserService {
  constructor() {}

  async getUser(id: User["id"], search: User['email'] | User['username'] | undefined = undefined): Promise<GetUserDTO | string> {    
    console.log(search);
    console.log(`SELECT iduser id, name, username, email FROM users WHERE username = '${search}' OR email = '${search}'`);
    const user = await client.query(
      search
      ? `SELECT iduser id, name, username, email FROM users WHERE username = '${search}' OR email = '${search}'`
      : `SELECT iduser id, name, username, email FROM users WHERE iduser = '${id}'`
    );

    console.log(user.rows[0]);

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
    const { name, username, email, password } = updatedUser;


    if (user.username !== userToUpdate.rows[0].username && user.username) await unique("users", "username", username);
    if (user.email !== userToUpdate.rows[0].email && user.email) await unique("users", "username", username);
    
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
    const { name, username, email, password } = user;
    await unique("users", "username", username);
    await unique("users", "email", email);
    
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
      [
        newUser.name,
        newUser.username,
        newUser.email,
        newUser.password,
        newUser.createdAt,
        newUser.updatedAt,
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
