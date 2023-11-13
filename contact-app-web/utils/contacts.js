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

const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

const findContact = (name) => {
  const contacts = loadContact();

  // Clean up the name parameter.
  name = name.trim().toLowerCase();

  // Find the contact with the matching name.
  const contact = contacts.find((contact) => {
    return contact.name.toLocaleLowerCase() === name;
  });

  return contact;
};

module.exports = {
  loadContact,
  findContact,
};
