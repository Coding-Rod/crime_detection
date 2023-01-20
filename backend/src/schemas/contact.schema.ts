import { Contact } from "../models/contact.model";

import {
    IsNotEmpty,
    IsString,
    IsEmail,
    IsUUID,
    Length,
    IsBoolean,
} from "class-validator";

export interface GetContactDTO extends Pick<Contact, "id" | "called" | "caller"> {}

export interface DeleteContactDTO extends Pick<Contact, "id" | "called"> {}

export interface IUpdateContactDTO extends Pick<Contact, "id" | "called" | "caller"> {}

export class UpdateContactDTO implements IUpdateContactDTO {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    called: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    caller: string;
}
