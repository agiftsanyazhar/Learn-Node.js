// Core module
// File system
const { error } = require("console");
const fs = require("fs");

// try {
//   fs.writeFileSync("data/test.txt", "Hello World synchronous");
// } catch (error) {
//   console.log(error);
// }

// fs.writeFile("data/test.txt", "Hello world async", (error) => {
//   console.log(error);
// });

// Sync
// const data = fs.readFileSync("data/test.txt", "utf-8");
// console.log(data);

// Asycn
// fs.readFile("data/test.txt", "utf-8", (error, data) => {
//   if (error) {
//     throw error;
//   }
//   console.log(data);
// });

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

    // console.log(`Halo ${nama}. ${hp}`);
    rl.close();
  });
});
