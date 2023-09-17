const http = require("http");
const port = 3000;
const fs = require("fs");

const renderHtml = (path, res) => {
  fs.readFile(path, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.write("Error: File not found");
    } else {
      res.write(data);
    }
    res.end();
  });
};

const server = http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const url = req.url;

    switch (url) {
      case "/about":
        renderHtml("./about.html", res);
        break;
      case "/contact":
        renderHtml("./contact.html", res);
        break;
      default:
        renderHtml("./index.html", res);
        break;
    }

    // if (url === "/about") {
    //   renderHtml("./about.html", res);
    //   //   fs.readFile("./about.html", (error, data) => {
    //   //     if (error) {
    //   //       res.writeHead(404);
    //   //       res.write("Error: File not found");
    //   //     } else {
    //   //       res.write(data);
    //   //     }
    //   //     res.end();
    //   //   });
    // } else if (url === "/contact") {
    //   renderHtml("./contact.html", res);
    // } else {
    //   renderHtml("./index.html", res);
    //   //   res.write("Hello world");
    //   //   fs.readFile("./index.html", (error, data) => {
    //   //     if (error) {
    //   //       res.writeHead(404);
    //   //       res.write("Error: File not found");
    //   //     } else {
    //   //       res.write(data);
    //   //     }
    //   //     res.end();
    //   //   });
    // }
  })
  .listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
