const http = require("http");
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("./controllers");

const server = http.createServer((req, res) => {
  if (req.url === "/api/tasks" && req.method === "GET") {
    getTasks(req, res);
  } else if (req.url.match(/\/api\/tasks\/\w+/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    getTask(req, res, id);
  } else if (req.url === "/api/tasks" && req.method === "POST") {
    createTask(req, res);
  } else if (req.url.match(/\/api\/tasks\/\w+/) && req.method === "PUT") {
    const id = req.url.split("/")[3];
    updateTask(req, res, id);
  } else if (req.url.match(/\/api\/tasks\/\w+/) && req.method === "DELETE") {
    const id = req.url.split("/")[3];
    deleteTask(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;
