/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
const { useState, useEffect, useContext, createContext, useReducer } = React;
const settings = {
  theme: {
    light: {
      foreground: "#000000",
      background: "#eeeeee",
    },
    dark: {
      foreground: "#ffffff",
      background: "#222222",
    },
  },
  name: "admin",
  tasks: [
    {
      title: "Alert",
      id: 87,
      priority: "24",
      due: "in 8 hours",
      isDone: false,
      timer: "April 26th 2021, 4:06:25 pm",
    },
    {
      title: "Alert",
      id: 87,
      priority: "24",
      due: "in 8 hours",
      isDone: false,
      timer: "April 26th 2021, 4:06:25 pm",
    },
    {
      title: "Penada",
      id: 98,
      priority: "24",
      due: "in 8 hours",
      isDone: false,
      timer: "April 26th 2021, 4:06:25 pm",
    },
  ],
};
const SettingsContext = createContext(settings);
const root = document.getElementById("root");
const Dashboard = () => {
  return (
    <div className="card">
      <div className="card__container">
        <div className="card__image">
          <img src="https://picsum.photos/470/340" alt="tu puta madre"></img>
        </div>
      </div>
      <div className="content">
        <div className="space"></div>
        <div className="tile tile--center">
          <div className="tile__icon">
            <figure className="avatar">
              <img
                src="https://organicthemes.com/demo/profile/files/2018/05/profile-pic-132x132.jpg"
                alt="Person"
              ></img>
            </figure>
          </div>

          <div className="tile__container">
            <p className="tile__title">Joanne Doe</p>
            <p className="tile__subtitle">
              <a href="/">@jdoe</a>
            </p>
          </div>
        </div>
        <p>
          Testing my new DSLR. Wow check out that deer! <a href="!#">#nature</a>
        </p>
      </div>
      <div className="card__footer level content">
        6:32 PM - 3 Jul 18
        <div className="u-pull-right">
          <div className="level-right ignore-screen">
            <a className="level-item">
              <span className="icon">
                <i
                  className="fa fa-wrapper small fa-reply"
                  aria-hidden="true"
                ></i>
              </span>
            </a>
            <a className="level-item">
              <span className="icon">
                <i
                  className="fa fa-wrapper small fa-retweet"
                  aria-hidden="true"
                ></i>
              </span>
            </a>
            <a className="level-item">
              <span className="icon">
                <i
                  className="fa fa-wrapper small fa-heart"
                  aria-hidden="true"
                ></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
const DatePick = ({ onClick }) => {
  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-dark"
        onClick={onClick}
        value="1"
      >
        1 Hour
      </button>
      <button
        type="button"
        className="btn btn-dark"
        onClick={onClick}
        value="2"
      >
        2 Hours
      </button>
      <button
        type="button"
        className="btn btn-dark"
        onClick={onClick}
        value="6"
      >
        6 Hours
      </button>
      <button
        type="button"
        className="btn btn-dark"
        onClick={onClick}
        value="8"
      >
        8 Hours
      </button>
      <button
        type="button"
        className="btn btn-dark"
        onClick={onClick}
        value="24"
      >
        1 day
      </button>
    </div>
  );
};

const Btn = ({ id, type, icon, name, isActive, onClick }) => (
  <button
    className={`btn-${isActive ? "primary" : "secondary"}`}
    onClick={onClick}
    type={type}
    name={name}
    id={id}
  >
    <i
      className={`fa fa-${icon} 
                }`}
    ></i>
  </button>
);
Btn.defaultProps = {
  type: "button",
};
/* Title component is another example of using ternary */
const Title = ({ title, state }) => {
  return (
    <div className="m-2">
      <h1>Hello, {title} </h1>
      <p>Current {state}</p>
    </div>
  );
};

const Form = () => {
  const handleChange = (e) => {
    e.persist();

    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <div>
      <p></p>
    </div>
  );
};

/* ActionLink combined with Btn components creates reusable pieces of code */
function ActionLink({ id, name, icon, fn }) {
  function handleClick(e) {
    e.preventDefault();
    fn();
  }
  return (
    <Btn
      id={id}
      name={name}
      icon={icon}
      isActive="false"
      onClick={handleClick}
    />
  );
}
/* MAIN COMPONENTS AREA */
/* Navegation is wrapped on LogingControl component*/
function Navigation({ button }) {
  return (
    <div className="header header-fixed unselectable header-animated">
      <div className="header-brand">
        <div className="nav-item no-hover">
          <h6 className="title">Task Manager</h6>
        </div>
        <div className="nav-item nav-btn" id="header-btn">
          {button}
        </div>
      </div>
      <div className="header-nav" id="header-menu">
        <div className="nav-left">
          <div className="nav-item text-center">
            <a href="/">
              <span className="icon">
                <i className="fab fa-wrapper fa-twitter" aria-hidden="true"></i>{" "}
              </span>{" "}
            </a>{" "}
          </div>
        </div>
        <div className="nav-right">{button}</div>
      </div>
    </div>
  );
}
/* GREETINGS COMPONENT */
/* To understand state, we create a global user variable */
var globalUser = "";
/* Custom setState function for our globalUser var */
const setUser = (val) => {
  globalUser = val;
  window.localStorage.setItem("user", JSON.stringify(globalUser));
  window.document.getElementById("user").value = "";
};

function GuestGreeting({ user, state }) {
  const [input, setInput] = useState(user);
  return (
    <div className="card m-3 p-3">
      <Dashboard />
      <div className="u-flex u-flex-column">
        <label htmlFor="user"></label>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input.name}
          type="text"
          className="px-2 py-1 m-1 u-round"
          name="name"
          id="user"
          aria-describedby="helpId"
          placeholder="Type your name"
        />
        <button
          onClick={() => setUser(input)} // We safe the user to the LocalStorage!
          type="button"
          className="px-2 py-1 m-1 u-round btn-secondary"
        >
          Set
        </button>
      </div>
      <small id="helpId" className="form-text text-muted">
        v.1 @macizomedia
      </small>
    </div>
  );
}

/* Greeting is wrapped on loginControl Component & conditionally renders with isLoggedIn */
function Greeting({ user, isLoggedIn }) {
  const prevUser = JSON.parse(window.localStorage.getItem("user"));
  /* Greeting is a nested component we want to set the user on our app context */
  if (isLoggedIn) {
    return (
      <div className="card m-3 p-4">
        <h1 className="title">{`Hello, ${user}`}</h1>
        <p className="subtitle">{settings.name}</p>
        <hr className="my-4" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <p className="subtitle">
          <Btn isActive={isLoggedIn} icon="user" name="set" onClick={null} />
        </p>
      </div>
    );
  }
  return (
    <GuestGreeting user={prevUser} state={settings.name} className="p-2" />
  );
}
/* TASK COMPONENTS */
const Task = ({ title, isDone, priority, timer, id, due, onClick, onEdit }) => {
  return (
    <div id={id} className="list-group">
      <a
        href={`${id}`}
        className="list-group-item list-group-item-action flex-column align-items-start"
      >
        <div className="card text-white bg-secondary mt-3">
          <div className="card-header col-10 ">
            <h4
              id={`${id}-text`}
              className={` text-${priority < 50 ? "warning" : "info"} text-${
                isDone ? "primary" : "secondary"
              }`}
            >
              {title}
            </h4>
          </div>
          <div className="card-body w-100 p-2 m-3">
            <small className=""> created at {timer}</small>
            <p className="mb-1">{id}</p>
            <small>{due}</small>
          </div>
          <div className="card-footer bg-warning d-flex">
            <Btn
              className="col-2 text-info"
              name="edit"
              icon="edit"
              onClick={onEdit}
            />
            <Btn
              className="col-2 card-footer w-25"
              name="bin"
              icon="trash"
              onClick={onClick}
            />
          </div>
        </div>
      </a>
    </div>
  );
};
const TaskListing = ({ tasks }) => {
  return tasks.map((item, i) => (
    <Task
      title={item.title}
      key={i}
      id={item.id}
      isDone={item.isDone}
      priority={item.priority}
      timer={item.timer}
      due={item.due}
      onClick={(event) => {
        event.preventDefault();
        const elem = window.document.getElementById(item.id);
        elem.innerHTML =
          '<div class="m-3"><h1 class="display-3 text-center">Deleting...</h1></div>';
        setTimeout(() => {
          elem.hidden = true;
        }, 1640);
        fetch("http://mmcs:3000/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: item.id,
        }).then((res) => console.log(res));
      }}
      onEdit={(event) => {
        event.preventDefault();
        const elem = window.document.getElementById(`${item.id}-text`);
        elem.innerHTML = "DONE!!";
        item.isDone = true;
      }}
    />
  ));
};

const InputElem = ({ label, type, id, help, onChange, value }) => {
  return (
    <div className="form-group-input">
      <label htmlFor={id}>{label}</label>
      <input
        onChange={onChange}
        type={type}
        className=""
        id={id}
        value={value}
        aria-describedby="emailHelp"
        placeholder="Enter Task"
      />
      <small id="emailHelp" className="form-text text-muted">
        {help}
      </small>
    </div>
  );
};
/* TASK UTILS */
/* To understand state, we create a global user variable */
var taskList = [];
/* Custom setState function for our globalTask var */
const saveTask = (val) => {
  taskList.push(val);
  let rawData = JSON.stringify(val, null, 2);
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: rawData,
  };
  fetch("http://mmcs:3000/echo", fetchOptions)
    .then((response) => response.body)
    .then((rb) => {
      const reader = rb.getReader();

      return new ReadableStream({
        start(controller) {
          // The following function handles each data chunk
          function push() {
            // "done" is a Boolean and value a "Uint8Array"
            reader.read().then(({ done, value }) => {
              // If there is no more data to read
              if (done) {
                console.log("done", done);
                controller.close();
                return;
              }
              // Get the data and send it to the browser via the controller
              controller.enqueue(value);
              // Check chunks by logging to the console
              console.log(done, value);
              push();
            });
          }

          push();
        },
      });
    })
    .then((stream) => {
      // Respond with our stream
      return new Response(stream, {
        headers: { "Content-Type": "text/html" },
      }).text();
    })
    .then((result) => {
      taskList.push(result);
      console.log(result);
    });
};

const fetchTaskList = (fn) => {
  //let rawData = JSON.stringify(val, null, 2)
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  fetch("http://mmcs:3000/tasks", fetchOptions)
    .then((response) => response.body)
    .then((rb) => {
      const reader = rb.getReader();

      return new ReadableStream({
        start(controller) {
          // The following function handles each data chunk
          function push() {
            // "done" is a Boolean and value a "Uint8Array"
            reader.read().then(({ done, value }) => {
              // If there is no more data to read
              if (done) {
                console.log("done", done);
                controller.close();
                return;
              }
              // Get the data and send it to the browser via the controller
              controller.enqueue(value);
              // Check chunks by logging to the console
              console.log(done, value);
              push();
            });
          }

          push();
        },
      });
    })
    .then((stream) => {
      // Respond with our stream
      return new Response(stream, {
        headers: { "Content-Type": "text/html" },
      }).text();
    })
    .then((result) => {
      fn(JSON.parse(result));
    });
};
/* CREATE TASK  */
const CreateTask = () => {
  const [task, setTask] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = window.document.getElementById("taskFrom");
    //alert(`A task was added: ${JSON.stringify(this.state)}`)
    // eslint-disable-next-line no-console
    console.log(task);
    saveTask(task);
    setTask({});
  };

  return (
    <div className="card m-3 p-4">
      <form
        id="taskForm"
        className="form-group u-flex-column"
        onSubmit={(event) => handleSubmit(event)}
      >
        <InputElem
          label="enter task"
          type="text"
          id="taskInput"
          help="What are we doing?"
          onChange={(e) =>
            setTask({
              ...task,
              title: e.target.value,
              id: Math.floor(Math.random() * 100),
            })
          }
        />
        <InputElem
          label="Priority"
          type="range"
          id="customRange1"
          help="when are we doing it?"
          onChange={(e) =>
            setTask({
              ...task,
              priority: e.target.value,
              isDone: false,
              timer: moment().format("MMMM Do YYYY, h:mm:ss a"),
            })
          }
        />
        <DatePick
          onClick={(e) =>
            setTask({
              ...task,
              due: moment().add(e.target.value, "hour").calendar(),
            })
          }
        />
        <input className="form-group-btn" type="submit" value="Submit" />
      </form>
    </div>
  );
};

/* AUTH CONTROL */
/* Login Component is wrap inside App */
const LoginControl = () => {
  const [storage, setStorage] = useState([]);
  const [state, setState] = useState({ isLoggedIn: false });
  /* const [action, dispatch] = useReducer(appReducer, []) */
  useEffect(() => {
    fetchTaskList((arr) => setStorage(arr));
  }, [setStorage]);
  let button;
  let dashboard;
  if (state.isLoggedIn) {
    button = (
      <Btn
        name="logout"
        icon="sign-out-alt"
        onClick={() => setState({ isLoggedIn: false })}
      />
    );
    dashboard = <TaskListing tasks={storage} />;
  } else {
    button = (
      <Btn icon="sign-in-alt" onClick={() => setState({ isLoggedIn: true })} />
    );
    dashboard = <CreateTask />;
  }
  return (
    <div className="pt-5">
      <Navigation button={button} />
      <Greeting user={globalUser} isLoggedIn={state.isLoggedIn} />
      {dashboard}
    </div>
  );
};

function App() {
  return (
    <SettingsContext.Provider value={settings}>
      <LoginControl />
    </SettingsContext.Provider>
  );
}
ReactDOM.render(<App />, root);
