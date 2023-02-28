import { Contact } from "../models/contact.model";
import {
  GetContactDTO,
  CreateContactDTO,
  DeleteContactDTO,
} from "../dtos/contact.dto";
import { GetUserDTO } from "../dtos/user.dto";
import { client } from "../db/config";

import boom from "@hapi/boom";
export class ContactService {
  constructor() {}

  async getContacts(caller: Contact["caller"]): Promise<GetUserDTO[] | string> {
    const contacts = await client.query(
      "SELECT * FROM contacts WHERE caller = $1",
      [caller]
    );
    if (!contacts.rows[0]) throw boom.notFound("No contacts found");
    return contacts.rows;
  }

  async createContact(
    contact: CreateContactDTO
  ): Promise<GetContactDTO | string> {
    const { called, caller } = contact;
    const contactExists = await client.query(
      "SELECT * FROM contacts WHERE called = $1 AND caller = $2",
      [called, caller]
    );
    if (contactExists.rows[0]) throw boom.conflict("Contact already exists");

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
