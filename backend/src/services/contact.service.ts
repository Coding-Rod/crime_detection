import { faker } from "@faker-js/faker";
import { Contact } from "../models/contact.model";
import { GetContactDTO, DeleteContactDTO, UpdateContactDTO } from "../dtos/contact.dto";

export class ContactService {
    private contacts: Contact[] = [];

    constructor() {
        this.contacts = [
            {
                id: faker.datatype.uuid(),
                called: faker.name.firstName(),
                caller: faker.name.firstName(),
            },
            {
                id: faker.datatype.uuid(),
                called: faker.name.firstName(),
                caller: faker.name.firstName(),
            },
            {
                id: faker.datatype.uuid(),
                called: faker.name.firstName(),
                caller: faker.name.firstName(),
            },
        ];
    }

    public getContacts(): GetContactDTO[] {
        return this.contacts;
    }

    public getContact(id: string): GetContactDTO {
        const contact : GetContactDTO | undefined = this.contacts.find((contact) => contact.id === id);
        if (!contact) throw new Error("Contact not found");
        else return contact;
    }

    public deleteContact(id: string): DeleteContactDTO {
        const contact : DeleteContactDTO | undefined = this.contacts.find((contact) => contact.id === id);
        this.contacts = this.contacts.filter((contact) => contact.id !== id);
        if (!contact) throw new Error("Contact not found");
        else return contact;
    }

    public updateContact(id: string, contact: UpdateContactDTO): GetContactDTO {
        const contactIndex = this.contacts.findIndex((contact) => contact.id === id);
        this.contacts[contactIndex] = { ...this.contacts[contactIndex], ...contact };
        return this.contacts[contactIndex];
    }
}