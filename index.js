
const { program } = require('commander')

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();


const { getAll, getContactById, addContact, deleteContact } = require('./contacts.js')







// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const allContacts = await getAll();
            return console.log(allContacts)
        case "get":
            const contactById = await getContactById(id);
            return console.log(contactById);

        case "add":
            const newContact = await addContact({ name, phone, email })
            return console.log(newContact)

        case "remove":
            const deletedContact = await deleteContact(id);
            return console.log(deletedContact)

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(options);