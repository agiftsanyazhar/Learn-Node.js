const fs = require("fs");
const readline = require("readline");
const validator = require("validator");

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

const simpanContact = (name, email, phone) => {
  const contact = {
    name,
    email,
    phone,
  };

  const contacts = loadContact();

  // Duplicate Check
  const duplicate = contacts.find((contact) => contact.name === name);
  if (duplicate) {
    console.log("Nama sudah terdaftar");
    return false;
  }

  // Email Check
  if (email) {
    if (!validator.isEmail(email)) {
      console.log("Email tidak valid");
      return false;
    }
  }

  // Phone Check
  if (phone) {
    if (!validator.isMobilePhone(phone, "id-ID")) {
      console.log("Telepon tidak valid");
      return false;
    }
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

const listContact = () => {
  const contacts = loadContact();

  console.log("Daftar Kontak");
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.name} - ${contact.phone}`);
  });
};

const detailContact = (name) => {
  const contacts = loadContact();

  // Clean up the name parameter.
  name = name.trim().toLowerCase();

  // Find the contact with the matching name.
  const contact = contacts.find((contact) => {
    return contact.name.toLocaleLowerCase() === name;
  });

  if (!contact) {
    console.log(`${name} tidak ditemukan`);
    return false;
  }

  console.log(`${contact.name}`);
  console.log(`${contact.phone}`);

  if (contact.email) {
    console.log(`${contact.email}`);
  }
};

const deleteContact = (name) => {
  const contacts = loadContact();

  // Clean up the name parameter.
  name = name.trim().toLowerCase();

  const newContacts = contacts.filter((contact) => {
    return contact.name.toLowerCase() !== name;
  });

  if (contacts.length === newContacts.length) {
    console.log(`${name} tidak ditemukan`);
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));
};

module.exports = {
  simpanContact,
  listContact,
  detailContact,
  deleteContact,
};
