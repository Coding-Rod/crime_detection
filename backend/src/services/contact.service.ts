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
      "SELECT us.iduser id, us.name, us.username FROM contacts co, users us WHERE co.called = us.iduser AND co.caller = $1 LIMIT $2 OFFSET $3",
      [caller, limit, offset]
      );
    if (!contacts.rows[0]) throw boom.notFound("No contacts found");
    return contacts.rows;
  }

  async createContact(
    caller: Contact["caller"],
    called: Contact["called"]
  ): Promise<GetContactDTO | string> {

    console.log(called, caller);
    const contacts = await client.query(
      "SELECT us.iduser id, us.name, us.username FROM contacts co, users us WHERE co.called = us.iduser AND co.caller = $1",
      [caller]
    );
    const calledField = Object.values(contacts.rows).map((contact) => contact.id);
      
    if (called === caller || called === 0) throw boom.badRequest("Invalid user");
    if (Object.keys(contacts.rows).length >= 10) throw boom.badRequest("You can't add more than 10 contacts");
    if (calledField.includes(called)) throw boom.badRequest("You already have this contact");

    const newContact = await client.query(
      "INSERT INTO contacts (called, caller, created_at) VALUES ($1, $2, NOW())",
      [called, caller]
    );
    return newContact.rows[0];
  }

  async deleteContact(caller: Contact['caller'], called: Contact['called']): Promise<DeleteContactDTO | string> {
    const contactToDelete = await client.query(
      "SELECT * FROM contacts WHERE called = $1 AND caller = $2",
      [called, caller]
    );
    if (!contactToDelete.rows[0]) throw boom.notFound("Contact not found");

    await client.query("DELETE FROM contacts WHERE called = $1 AND caller = $2", [
      called,
      caller,
    ]);
    return contactToDelete.rows[0];
  }
}
