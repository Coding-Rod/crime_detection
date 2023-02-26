import { faker } from "@faker-js/faker";
import { Contact } from "../models/contact.model";
import { GetContactDTO, CreateContactDTO, DeleteContactDTO } from "../dtos/contact.dto";

export class ContactService {
    private contacts: Contact[] = this.generateContacts(5);

    generateContacts(amount: number): Contact[] {
        const contacts: Contact[] = [];
        for (let i = 0; i < amount; i++) {
            contacts.push({
                id: faker.datatype.number(),
                called: faker.datatype.number(),
                caller: faker.datatype.number(),
                createdAt: faker.date.past(),
            });
        }
        return contacts;
    }

    constructor() {}

    async getContacts(caller: number): Promise<GetContactDTO[] | string> {
        try {
            const contacts = await Promise.resolve(this.contacts.filter((contact : Contact) => contact.caller === caller)).then(
                (contacts: Contact[] | []) => contacts
            );
            const data = contacts.map((contact) => {
                const { id, called, caller } = contact;
                return { id, called, caller };
            });
            return data;
        } catch (err) {
            console.error(err);
            return err as string;
        }
    }

    async getContact(id: number, caller: number): Promise<GetContactDTO | string> {
        try {
            const contact = await Promise.resolve(this.contacts.find((contact : Contact) => contact.id === id && contact.caller === caller)).then(
                (contact: Contact | undefined) => contact
            );
            if (!contact) throw new Error("Contact not found");
            const { called } = contact;
            return { id, called, caller };
        } catch (err) {
            console.error(err);
            return err as string;
        }
    }

    async createContact(contact: CreateContactDTO): Promise<GetContactDTO | string> {
        try {
            const { called, caller } = contact;
            const newContact: Contact = {
                id: faker.datatype.number(),
                called,
                caller,
                createdAt: faker.date.past(),
            };
            this.contacts.push(newContact);
            return { id: newContact.id, called, caller };
        } catch (err) {
            console.error(err);
            return err as string;
        }
    }

    async deleteContact(id: number): Promise<GetContactDTO | string> {
        try {
            const contact = await Promise.resolve(this.contacts.find((contact : Contact) => contact.id === id)).then(
                (contact: Contact | undefined) => contact
            );
            if (!contact) throw new Error("Contact not found");
            const { called, caller } = contact;
            this.contacts = this.contacts.filter((contact) => contact.id !== id);
            return { id, called, caller };
        } catch (err) {
            console.error(err);
            return err as string;
        }
    }

}