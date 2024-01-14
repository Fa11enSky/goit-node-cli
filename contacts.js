const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументувати кожну функцію
/**
 * Read and return contact
 * @param {void} void
 * @returns {object[]}Contacts object array
 */

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
}

/**
 * Find contact object by ID and return it | if contact not finded return null
 * @param {number} contactId
 * @returns {Promise<object| null>}
 */

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((el) => el.id === contactId);
    return contact || null;
  } catch (error) {
    console.log(error);
  }
}

/**
 * find contact by id and return it | if contact not finded return null
 * @param {number} contactId
 * @returns {object|null}
 */

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((el) => el.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Create new contact and add it to contacts 'database'
 * @param {string} name name to new contact
 * @param {string} email email to new contact
 * @param {number} phone phone to new contact
 * @returns {object}
 */
async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
