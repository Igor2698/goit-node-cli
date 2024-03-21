
const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");



const contactsPath = path.join(__dirname, "./db/contacts.json");

const getAll = async () => {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
}

const getContactById = async (id) => {
    const contacts = await getAll();
    const result = contacts.find(contact => contact.id === id);
    return result || null
}

const addContact = async (data) => {
    const contacts = await getAll();
    const newContact = {
        id: nanoid(),
        ...data
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContact;
}


const deleteContact = async (id) => {
    const contacts = await getAll();
    const index = contacts.findIndex(contact => contact.id === id);

    if (index === -1) {
        return null
    }

    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return result

}


module.exports = {
    getAll,
    getContactById,
    addContact, 
    deleteContact
}