const { mongoClient, ObjectID } = require("mongodb");
const MongoClient = require("mongodb/lib/mongo_client");

const uri = "mongodb://localhost:27017/";
const dbName = "contact-app";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((error, client) => {
  if (error) {
    return console.log("Koneksi gagal");
  }

  // Database
  const db = client.db(dbName);

  // Create
  //   db.collection("mahasiswa").insertOne(
  //     {
  //       name: "Unair",
  //       email: "unair@gmail.com",
  //       phone: "085648218283",
  //     },
  //     (error, result) => {
  //       if (error) {
  //         return console.log("Gagal menambahkan data");
  //       }
  //       console.log(result);
  //     }
  //   );

  // Create multiple
  //   db.collection("mahasiswa").insertMany([
  //     {
  //       name: "Universitas Airlangga",
  //       email: "universitas Airlangga@gmail.com",
  //       phone: "085648213423",
  //     },
  //     {
  //       name: "PENS",
  //       email: "pens@gmail.com",
  //       phone: "0856482119203",
  //     },
  //     (error, result) => {
  //       if (error) {
  //         return console.log("Gagal menambahkan data");
  //       }
  //       console.log(result);
  //     },
  //   ]);

  // Read
  //   console.log(
  //     db
  //       .collection("mahasiswa")
  //       .find()
  //       .toArray((error, result) => {
  //         console.log(result);
  //       })
  //   );

  // Read with criteria
  //   console.log(
  //     db
  //       .collection("mahasiswa")
  //       .find({ name: "Agiftsany" })
  //       .toArray((error, result) => {
  //         console.log(result);
  //       })
  //   );

  // Update
  // const updatePromise = db.collection("mahasiswa").updateOne(
  //   {
  //     _id: ObjectID("65527bcc634a3e65e8a7d6db"),
  //   },
  //   {
  //     $set: {
  //       name: "ABCD",
  //     },
  //   }
  // );

  // updatePromise
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // Update multiple
  // db.collection("mahasiswa").updateMany(
  //   {
  //     _id: ObjectID("65527bcc634a3e65e8a7d6db"),
  //   },
  //   {
  //     $set: {
  //       name: "ABCD",
  //     },
  //   }
  // );

  // Delete
  // db.collection("mahasiswa")
  //   .deleteOne({
  //     _id: ObjectID("65527bcc634a3e65e8a7d6db"),
  //   })
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // Delete Multiple
  // db.collection("mahasiswa")
  //   .deleteMany({
  //     _id: ObjectID("65527bcc634a3e65e8a7d6db"),
  //   })
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
});
