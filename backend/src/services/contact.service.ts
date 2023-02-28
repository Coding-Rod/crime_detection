import { Contact } from "../models/contact.model";
import { GetContactDTO, CreateContactDTO, DeleteContactDTO } from "../dtos/contact.dto";
import { GetUserDTO } from "../dtos/user.dto";
import { client } from "../db/config";
export class ContactService {
    constructor() {}

    async getContacts(caller: Contact['caller']): Promise<GetUserDTO[] | string> {
        try {
            const contacts = await client.query('SELECT us.iduser id, us.name, us.username, us.email FROM contacts co, users us WHERE caller= $1 AND co.called = us.iduser;', [caller]);
            return contacts.rows;
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

    async deleteContact(id: Contact['id']): Promise<DeleteContactDTO | string> {
        try {
            const deletedContact = await client.query("DELETE FROM contacts WHERE idcontact = $1 RETURNING *", [id]);
            return deletedContact.rows[0];
        } catch (err) {
            console.error(err);
            return err as string;
        }
    }
}