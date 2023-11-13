const yargs = require("yargs");
const contacts = require("./contacts");

yargs
  .command({
    command: "add",
    describe: "Menambahkan Kontak Baru",
    builder: {
      name: {
        describe: "Nama Lengkap: ",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email: ",
        demandOption: true,
        type: "string",
      },
      phone: {
        describe: "Phone: ",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contacts.simpanContact(argv.name, argv.email, argv.phone);
    },
  })
  .demandCommand();

// Menampilkan Daftar Nama Kontak
yargs.command({
  command: "list",
  describe: "Menampilkan Daftar Nama Kontak",
  handler() {
    contacts.listContact();
  },
});

// Menampilkan Detail Kontak
yargs.command({
  command: "detail",
  describe: "Menampilkan Detail Kontak",
  builder: {
    name: {
      describe: "Nama Lengkap: ",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.name);
  },
});

// Menghapus Kontak
yargs.command({
  command: "delete",
  describe: "Menghapus Kontak",
  builder: {
    name: {
      describe: "Nama Lengkap: ",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.name);
  },
});

yargs.parse();
