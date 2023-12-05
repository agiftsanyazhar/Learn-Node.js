const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/contact-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// const Contact = mongoose.model("Contact", contactSchema);

// const contact1 = new Contact({
//   name: "Agif2",
//   email: "agif2@gmail.com",
//   phone: "085655",
// });

// contact1.save().then((contact) => console.log(contact));
