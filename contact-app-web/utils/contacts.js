const fs = require("fs");

// Membuat Folder Data
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Membuat File Contacts.json
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContacts = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

const findContact = (name) => {
  const contacts = loadContacts();

  name = name.trim().toLowerCase();

  const contact = contacts.find((contact) => {
    return contact.name.toLocaleLowerCase() === name;
  });

  return contact;
};

const saveContacts = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

const storeContact = (contact) => {
  const contacts = loadContacts();

  contacts.push(contact);

  saveContacts(contacts);
};

const checkDuplicate = (name) => {
  const contacts = loadContacts();
  return contacts.find((contact) => contact.name === name);
};

module.exports = {
  loadContacts,
  findContact,
  storeContact,
  checkDuplicate,
};
