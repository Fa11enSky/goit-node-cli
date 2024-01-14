const { program } = require("commander");
require('cross-env')
const {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} = require("./contacts");
program
  .option('-a, --action <type>')
  .option("-i,--id <type>")
  .option("-n, --name <type> ")
  .option("-e, --email <type> ")
  .option("-p,--phone <type>");
program.parse(process.argv);

const options = program.opts();
if (options.action === 'a') console.log("daffffffffff");
console.dir(options);
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      // ...
      break;

    case "get":
      // ... id
      break;

    case "add":
      // ... name email phone
      break;

    case "remove":
      // ... id
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction(argv);
