let database = require("./databases.json");

const { writeDataToFile } = require("./utils");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(database);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const data = database.find((i) => i.id === id);
    resolve(data);
  });
}

function create(entry) {
  return new Promise((resolve, reject) => {
    const newData = { id: Math.random(), ...entry };
    database.push(newData);
    if (process.env.NODE_ENV !== "test") {
      writeDataToFile("./databases.json", database);
    }
    resolve(newData);
  });
}

function update(id, entry) {
  return new Promise((resolve, reject) => {
    const index = databases.findIndex((i) => i.id === id);
    database[index] = { id, ...entry };
    if (process.env.NODE_ENV !== "test") {
      writeDataToFile("./databases.json", database);
    }
    resolve(database[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    data = database.filter((i) => i.id !== id);
    if (process.env.NODE_ENV !== "test") {
      writeDataToFile("./databases.json", data);
    }
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
