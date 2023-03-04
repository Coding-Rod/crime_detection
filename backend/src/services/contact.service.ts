import { Contact } from "../models/contact.model";
import {
  GetContactDTO,
  CreateContactDTO,
  DeleteContactDTO,
} from "../dtos/contact.dto";
import { GetUserDTO } from "../dtos/user.dto";
import { client } from "../db/config";
import unique from "../utils/db/unique";

import boom from "@hapi/boom";
export class ContactService {
  constructor() {}

  async getContacts(caller: Contact["caller"], limit: number, offset: number): Promise<GetUserDTO[] | string> {
    const contacts = await client.query(
      "SELECT * FROM contacts WHERE caller = $1 LIMIT $2 OFFSET $3",
      [caller, limit, offset]
    );
    if (!contacts.rows[0]) throw boom.notFound("No contacts found");
    return contacts.rows;
  }

  async createContact(
    contact: CreateContactDTO
  ): Promise<GetContactDTO | string> {
    const { called, caller } = contact;
    await unique("contacts", "called", `${called}`);

    const newContact = await client.query(
      "INSERT INTO contacts (called, caller) VALUES ($1, $2) RETURNING *",
      [called, caller]
    );
    return newContact.rows[0];
  }

  async deleteContact(id: Contact["id"]): Promise<DeleteContactDTO | string> {
    const contactToDelete = await client.query(
      "SELECT * FROM contacts WHERE idcontact = $1",
      [id]
    );
    if (!contactToDelete.rows[0]) throw boom.notFound("Contact not found");

    await client.query("DELETE FROM contacts WHERE idcontact = $1", [id]);
    return contactToDelete.rows[0];
  }
}
