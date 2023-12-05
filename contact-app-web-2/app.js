const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

require("./utils/db");
const contact = require("./model/contact");

const app = express();
const port = 3000;

// EJS
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Configure flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 600 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// Home
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

  // Home
  res.render("index", {
    nama: "Agif",
    title: "Home",
    layout: "layouts/app",
    mahasiswa,
  });
});

// About
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    layout: "layouts/app",
  });
});

// Contact
app.get("/contact", async (req, res) => {
  //   contact.find().then((contact) => {
  //     res.send(contact);
  //   });

  const contacts = await contact.find();

  res.render("contact/index", {
    title: "Contact",
    layout: "layouts/app",
    contacts,
    msg: req.flash("msg"),
  });
});

app.get("/contact/detail/:name", async (req, res) => {
  const contacts = await contact.findOne({ name: req.params.name });

  res.render("contact/detail", {
    title: "Detail",
    layout: "layouts/app",
    contacts,
  });
});

app.listen(port, () => {
  console.log(`Mongo Contact App | Listening at http://localhost:${port}`);
});
