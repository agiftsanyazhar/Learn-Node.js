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
  })
  .listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
