const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {
  loadContacts,
  findContact,
  storeContact,
  updateContact,
  checkDuplicate,
  destroyContact,
} = require("./utils/contacts");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

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
app.get("/contact", (req, res) => {
  const contacts = loadContacts();

  res.render("contact/index", {
    title: "Contact",
    layout: "layouts/app",
    contacts,
    msg: req.flash("msg"),
  });
});

app.get("/contact/create", (req, res) => {
  res.render("contact/create", {
    title: "Create",
    layout: "layouts/app",
  });
});

app.post(
  "/contact/store",
  [
    body("name").custom((value) => {
      const duplicate = checkDuplicate(value);

      if (duplicate) {
        throw new Error("Duplicate name");
      }
      return true;
    }),
    check("email", "Invalid email").isEmail(),
    check("phone", "Invalide phone").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("contact/create", {
        title: "Create",
        layout: "layouts/app",
        errors: errors.array(),
      });
    } else {
      storeContact(req.body);
      req.flash("msg", "Saved successfully");
      res.redirect("/contact");
    }
  }
);

app.get("/contact/detail/:name", (req, res) => {
  const contact = findContact(req.params.name);

  res.render("contact/detail", {
    title: "Detail",
    layout: "layouts/app",
    contact,
  });
});

app.get("/contact/edit/:name", (req, res) => {
  const contact = findContact(req.params.name);

  res.render("contact/edit", {
    title: "Edit",
    layout: "layouts/app",
    contact,
  });
});

app.post(
  "/contact/update",
  [
    body("name").custom((value, { req }) => {
      const duplicate = checkDuplicate(value);

      if (value !== req.body.oldName && duplicate) {
        throw new Error("Duplicate name");
      }
      return true;
    }),
    check("email", "Invalid email").isEmail(),
    check("phone", "Invalide phone").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("contact/edit", {
        title: "Edit",
        layout: "layouts/app",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      updateContact(req.body);
      req.flash("msg", "Saved successfully");
      res.redirect("/contact");
    }
  }
);

app.get("/contact/destroy/:name", (req, res) => {
  const contact = findContact(req.params.name);

  if (!contact) {
    res.status(404);
    res.send("<h1>404</h1>");
  } else {
    destroyContact(req.params.name);
    req.flash("msg", "Deleted successfully");
    res.redirect("/contact");
  }
});

// Other
app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
