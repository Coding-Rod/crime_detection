import { Contact } from "../models/contact.model";

import {
    IsNotEmpty,
    IsNumber
} from "class-validator";

export interface GetContactDTO extends Pick<Contact, "id" | "called" | "caller"> {}

export interface ICreateContactDTO extends Omit<Contact, "id" | "createdAt"> {}

export class CreateContactDTO implements ICreateContactDTO {
    @IsNotEmpty()
    @IsNumber()
    called: number;

    @IsNotEmpty()
    @IsNumber()
    caller: number;
}

export interface DeleteContactDTO extends Omit<Contact, "createdAt"> {}