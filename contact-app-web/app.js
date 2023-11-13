const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadContact, findContact } = require("./utils/contacts");

const app = express();
const port = 3000;

// EJS
app.set("view engine", "ejs");
app.use(expressLayouts);

// Built-in Middleware
app.use(express.static("public"));

app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Agiftsany Azhar1",
      email: "agif1@gmail.com",
    },
    {
      nama: "Agiftsany Azhar2",
      email: "agif2@gmail.com",
    },
    {
      nama: "Agiftsany Azhar3",
      email: "agif3@gmail.com",
    },
  ];

  res.render("index", {
    nama: "Agif",
    title: "Home",
    layout: "layouts/app",
    mahasiswa,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    layout: "layouts/app",
  });
});

app.get("/contact", (req, res) => {
  const contacts = loadContact();
  res.render("contact/index", {
    title: "Contact",
    layout: "layouts/app",
    contacts,
  });
});

app.get("/contact/:name", (req, res) => {
  const contact = findContact(req.params.name);
  res.render("contact/detail", {
    title: "Detail",
    layout: "layouts/app",
    contact,
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
