import { User } from "../models/user.model";

import {
    IsNotEmpty,
    IsString,
    IsEmail,
    Length,
    IsNumber,
    Min,
} from "class-validator";

export interface GetUserDTO extends Pick<User, "id" | "name" | "username" | "email" | "phone"> {}

export interface DeleteUserDTO extends Pick<User, "id" | "name"> {}

export interface IUpdateUserDTO extends Pick<User, "id" | "name" | "username" | "email" | "password" | "phone"> {}

export class UpdateUserDTO implements IUpdateUserDTO {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    id: number;

    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 50)
    password: string;
}

export interface ICreateUserDTO extends Pick<User, "name" | "username" | "email" | "password" | "phone"> {}

export class CreateUserDTO implements ICreateUserDTO {
    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 50)
    password: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 50)
    phone: number;
}

export interface ILoginUserDTO extends Pick<User, "username" | "password"> {}

export class LoginUserDTO implements ILoginUserDTO {
    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    username: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 50)
    password: string;
}

export interface IChangePasswordDTO extends Pick<User, "id" | "password"> {}

export class ChangePasswordDTO implements IChangePasswordDTO {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    id: number;

    @IsNotEmpty()
    @IsString()
    @Length(8, 50)
    password: string;
}

export interface AuthUserDTO extends Pick<User, "id" | "token"> {}