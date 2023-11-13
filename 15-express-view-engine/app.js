const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;

// EJS
app.set("view engine", "ejs");
app.use(expressLayouts);

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
  res.render("contact", {
    title: "Contact",
    layout: "layouts/app",
  });
});

app.get("/product/:id", (req, res) => {
  res.send(
    `Product ID:  ${req.params.id} <br> Category ID: ${req.query.category}`
  );
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
