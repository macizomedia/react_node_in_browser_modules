/* eslint-disable no-console */
// Importing necessary modules
const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const { parse } = require("querystring");
const { hostname } = require("os");
const crypto = require("crypto");
const hash = crypto.createHash("sha256");
const port = process.env.PORT || 3000;
var basePath = "./";

const server = http.createServer((req, res) => {
  //console.log(`Url is ${req.url} and Method is ${req.method}`)
  if (req.method === "POST" && req.url === "/echo") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      res.end("ok");
      req.pipe(res);
      fs.readFile("databases.json", "utf8", (err, data) => {
        if (err) {
          console.log(`Error reading file from disk: ${err}`);
        } else {
          // parse JSON string to JSON object
          const databases = JSON.parse(data);

          // add a new record
          databases.push(JSON.parse(body));

          // write new data back to the file
          fs.writeFile(
            "databases.json",
            JSON.stringify(databases, null, 4),
            (err) => {
              if (err) {
                console.log(`Error writing file: ${err}`);
              }
            }
          );
        }
      });
    });
  } else if (req.method === "POST" && req.url === "/delete") {
    //var stream = fs.createReadStream('storage.json', {flags:'r+'});

    fs.readFile("databases.json", "utf8", (err, data) => {
      const databases = JSON.parse(data);
      let updatedData = null;
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        //req.pipe(res);
        if (err) {
          console.log(`Error reading file from disk: ${err}`);
        } else {
          // parse JSON string to JSON object
          // Filter record
          updatedData = databases.filter((item) => item.id !== Number(body));

          // write new data back to the file
          fs.writeFile(
            "databases.json",
            JSON.stringify(updatedData, null, 4),
            (err) => {
              if (err) {
                console.log(`Error writing file: ${err}`);
              }
            }
          );
          console.log(updatedData);
        }
      });
      res.end(updatedData);
    });
  } else if (req.method === "GET" && req.url === "/tasks") {
    //var stream = fs.createReadStream('storage.json', {flags:'r+'});
    fs.createReadStream("databases.json", "UTF-8").pipe(res);
  } else if (req.method === "POST" && req.url === "/login") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    hash.on("readable", () => {
      // Only one element is going to be produced by the
      // hash stream.
      const data = hash.read();
      if (data) {
        console.log();
        res.write(JSON.stringify(JSON.stringify(data.toString("hex"))));
      }
    });

    hash.write(body);
    hash.end();
    res.end();
  } else {
    reqPath = req.url;

    const headers = {
      "Access-Control-Allow-Origin": "*",
    };
    var resolvedBase = path.resolve(basePath);
    var safeSuffix = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, "");
    var fileLoc = path.join(resolvedBase, safeSuffix);

    if (reqPath.split(".").length <= 2) {
      if (req.url === "/") {
        res.writeHead(200, headers);
        fs.createReadStream("index.html").pipe(res);
      } else if (req.url.match(".css$")) {
        res.writeHead(200, { "Content-Type": "text/css" });
        fs.createReadStream("style.css", "UTF-8").pipe(res);
      } else if (req.url.match(".js$")) {
        res.writeHead(200, { "Content-Type": "text/javascript" });
        fs.createReadStream(fileLoc, "UTF-8").pipe(res);
      } else if (req.url.match(".json$")) {
        res.writeHead(200, { "Content-Type": "application/json" });
        fs.createReadStream(fileLoc, "UTF-8").pipe(res);
      } else {
        fs.readFile(__dirname + req.url, function (err, data) {
          if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
          }
          res.writeHead(200, headers);
          res.end(data);
        });
      }
    } else {
      res.writeHead(403, { "Content-Type": "text/plain" });
      res.write("403 ERROR: FORBIDDEN.");
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Listening on http://${hostname}:${port}`);
});
