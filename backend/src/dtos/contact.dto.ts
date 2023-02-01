import { Contact } from "../models/contact.model";

import {
    IsNotEmpty,
    IsNumber,
    Min,
} from "class-validator";

export interface GetContactDTO extends Pick<Contact, "id" | "called" | "caller"> {}

export interface ICreateContactDTO extends Omit<Contact, "id" | "createdAt"> {}

export class CreateContactDTO implements ICreateContactDTO {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    called: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    caller: number;
}

export interface DeleteContactDTO extends Omit<Contact, "createdAt"> {}