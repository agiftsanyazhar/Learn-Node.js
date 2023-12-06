const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

require("./utils/db");
const contact = require("./model/contact");

const app = express();
const port = 3000;

app.use(methodOverride("_method"));

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

app.get("/contact/create", (req, res) => {
  res.render("contact/create", {
    title: "Create",
    layout: "layouts/app",
  });
});

app.post(
  "/contact/store",
  [
    body("name").custom(async (value) => {
      const duplicate = await contact.findOne({ name: value });

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
      contact.insertMany(req.body, (error, result) => {
        req.flash("msg", "Saved successfully");
        res.redirect("/contact");
      });
    }
  }
);

app.get("/contact/detail/:name", async (req, res) => {
  const contacts = await contact.findOne({ name: req.params.name });

  res.render("contact/detail", {
    title: "Detail",
    layout: "layouts/app",
    contacts,
  });
});

app.get("/contact/edit/:name", async (req, res) => {
  const contacts = await contact.findOne({ name: req.params.name });

  res.render("contact/edit", {
    title: "Edit",
    layout: "layouts/app",
    contacts,
  });
});

app.put(
  "/contact",
  [
    body("name").custom(async (value, { req }) => {
      const duplicate = await contact.findOne({ name: value });

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
      contact
        .updateOne(
          { _id: req.body._id },
          {
            $set: {
              name: req.body.name,
              email: req.body.email,
              phone: req.body.phone,
            },
          }
        )
        .then((result) => {
          req.flash("msg", "Saved successfully");
          res.redirect("/contact");
        });
    }
  }
);

// app.get("/contact/destroy/:name", async (req, res) => {
//   const contacts = await contact.findOne({ name: req.params.name });

//   if (!contacts) {
//     res.status(404);
//     res.send("<h1>404</h1>");
//   } else {
//     contacts.deleteOne({ _id: contacts._id }).then((result) => {
//       req.flash("msg", "Deleted successfully");
//       res.redirect("/contact");
//     });
//   }
// });

app.delete("/contact", (req, res) => {
  contact.deleteOne({ name: req.body.name }).then((result) => {
    req.flash("msg", "Deleted successfully");
    res.redirect("/contact");
  });
});

app.listen(port, () => {
  console.log(`Mongo Contact App | Listening at http://localhost:${port}`);
});
