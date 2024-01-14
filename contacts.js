const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }

  // ...твій код. Повертає масив контактів.
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((el) => el.id === contactId);
    return contact || null;
  } catch (error) {
    console.log(error);
  }

  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
}

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

  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact; 
  } catch (error) {
    console.log(error)
  }
  // ...твій код. Повертає об'єкт доданого контакту.
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
