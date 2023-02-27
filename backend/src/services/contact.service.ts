import { faker } from "@faker-js/faker";
import { Contact } from "../models/contact.model";
import { GetContactDTO, CreateContactDTO, DeleteContactDTO } from "../dtos/contact.dto";
import { client } from "../db/config";
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

    async getContacts(): Promise<GetContactDTO[] | string> {
        try {
            const contacts = await client.query("SELECT * FROM contacts");
            return contacts.rows;
        } catch (err) {
            console.error(err);
            return err as string;
        }
    }

    async getContact(id: number): Promise<GetContactDTO | string> {
        try {
            const contact = await client.query("SELECT * FROM contacts WHERE idcontact = $1", [id]);
            return contact.rows[0];
        } catch (err) {
            console.error(err);
            return err as string;
        }
    }

    async createContact(contact: CreateContactDTO): Promise<GetContactDTO | string> {
        try {
            const { called, caller } = contact;
            const newContact = await client.query(
                "INSERT INTO contacts (called, caller, created_at) VALUES ($1, $2, $3) RETURNING *",
                [called, caller, new Date()]
            );
            return newContact.rows[0];
        } catch (err) {
            console.error(err);
            return err as string;
        }
    }

    async deleteContact(id: number): Promise<DeleteContactDTO | string> {
        try {
            const deletedContact = await client.query("DELETE FROM contacts WHERE idcontact = $1 RETURNING *", [id]);
            return deletedContact.rows[0];
        } catch (err) {
            console.error(err);
            return err as string;
        }
    }
}