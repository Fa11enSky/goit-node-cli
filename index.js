const { program } = require("commander");

const {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} = require("./contacts");
program
  .option("-a, --action <type>", "Action type: list | get | add | remove")
  .option("-i,--id <type>", "Contact id")
  .option("-n, --name <type> ", "Contact name")
  .option("-e, --email <type> ", "Contact email")
  .option("-p,--phone <type>", "Contact phone");

program.parse(process.argv);

const options = program.opts();
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts()
     return console.log(contacts);

    case "get":
      const contact = await getContactById(options.id)
      return console.log(contact)

    case "add":
     const newContact= await addContact(name,email,phone)
      return console.log(newContact)

    case "remove":
      const removedContact = await removeContact(id)
      return console.log(removedContact)

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
