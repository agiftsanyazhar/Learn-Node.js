// Core module
// File system
const { error } = require("console");
const fs = require("fs");

// Readline
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Siapa nama Anda? ", (nama) => {
  rl.question("HP? ", (hp) => {
    const contact = {
      nama,
      hp,
    };

    const file = fs.readFileSync("data/contact.json", "utf-8");

    const contacts = JSON.parse(file);

    contacts.push(contact);

    fs.writeFileSync("data/contact.json", JSON.stringify(contacts));

    rl.close();
  });
});
