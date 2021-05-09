const Data = require("./models");

const { getPostData } = require("./utils");

// @desc    Gets All Data
// @route   GET /api/tasks
async function getTasks(req, res) {
  try {
    const tasks = await Data.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(tasks));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets Single Task
// @route   GET /api/task/:id
async function getTask(req, res, id) {
  try {
    const task = await Data.findById(id);

    if (!task) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(task));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Create a Task
// @route   POST /api/Tasks
async function createTask(req, res) {
  try {
    const body = await getPostData(req);

    const { title, id, priority, due, isDone, timer } = JSON.parse(body);

    const task = {
      title,
      id,
      priority,
      due,
      isDone,
      timer,
    };

    const newTask = await Data.create(task);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newTask));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Update a Task
// @route   PUT /api/tasks/:id
async function updateTask(req, res, id) {
  try {
    const task = await Data.findById(id);

    if (!task) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Not Found" }));
    } else {
      const body = await getPostData(req);

      const { title, id, priority, due, isDone, timer } = JSON.parse(body);

      const taskData = {
        title: title || task.title,
        id: id || task.id,
        priority: priority || task.priority,
        due: due || task.due,
        isDone: isDone || task.isDone,
        timer: timer || task.timer,
      };

      const updTask = await Data.update(id, taskData);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updTask));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Delete Tasks
// @route   DELETE /api/tasks/:id
async function deleteTask(req, res, id) {
  try {
    const task = await Data.findById(id);

    if (!task) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Not Found" }));
    } else {
      await Data.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Task ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
