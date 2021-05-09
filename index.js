/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
const { useState, useEffect, useContext, createContext, useReducer } = React;

async function loginUser(credentials) {
  return fetch("http://mmcs:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => data.body)
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
    .then((result) => result);
}

const SettingsContext = createContext();
const root = document.getElementById("root");

const Login = () => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    console.log(JSON.parse(token));
    setToken(JSON.parse(token));
  };
  return (
    <form name="login-form" onSubmit={handleSubmit}>
      <div className="frame__body">
        <h3>Login</h3>
        <div className="form-section">
          <label>Email</label>
          <div className="input-control">
            <input
              className="input-contains-icon"
              id="email"
              name="email"
              placeholder="Email"
              type="text"
              onChange={(e) => setUserName(e.target.value)}
            ></input>
            <span className="icon">
              <i className="far fa-wrapper fa-envelope-open small"></i>
            </span>
          </div>
        </div>
        <div className="form-section">
          <label>Password</label>
          <div className="input-control">
            <input
              className="input-contains-icon"
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <span className="icon">
              <i className="fas fa-wrapper fa-key small"></i>
            </span>
          </div>
        </div>
        <div className="space"></div>
        <button
          className="btn-info u-pull-right"
          name="btn"
          value="login"
          type="submit"
        >
          Log In
        </button>
        <span className="fg-danger info"></span>
        <a href="#" className="u u-LR">
          Forgot password?
        </a>
      </div>
    </form>
  );
};
const Dashboard = () => {
  const [data, setData] = useContext(SettingsContext);
  console.log(data);
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
            <p className="tile__title">{data.name}</p>
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
  return (
    <div className="card m-3 p-3">
      <Dashboard />
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
        <p className="subtitle">{prevUser}</p>
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
  return <GuestGreeting state={prevUser} className="p-2" />;
}
/* TASK COMPONENTS */
const Task = ({ title, isDone, priority, timer, id, due, onClick, onEdit }) => {
  return (
    <div id={id} className="card">
      <div className="card__header">
        <p
          id={`${id}-text`}
          className={` font-bold px-3 ${
            priority < 50 ? "warning" : "info"
          } text-${isDone ? "primary" : "secondary"}`}
        >
          {title}
        </p>
      </div>
      <div className="card__footer level content">
        <small className=""> created at {timer}</small>
        <p className="mb-1">{id}</p>
        <small>{due}</small>
      </div>
      <div className="card__action-bar u-center">
        <Btn
          className="btn-transparent outline"
          name="edit"
          icon="edit"
          onClick={onEdit}
        />
        <Btn
          className="btn-transparent outline"
          name="bin"
          icon="trash"
          onClick={onClick}
        />
        <Btn
          className="btn-transparent outline"
          name="bin"
          icon="cogs"
          onClick={onClick}
        />
      </div>
    </div>
  );
};
const TaskListing = ({ tasks }) => {
  useEffect(() => {
    anime({
      targets: ".card",
      translateY: [500, 0], // from 100 to 250
      delay: anime.stagger(50),
      easing: "easeOutSine(1, 80, 10, 0)",
    });
  }, []);
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
  const [storage, setStorage] = useContext(SettingsContext);
  const [state, setState] = useState({ isLoggedIn: false });
  /* const [action, dispatch] = useReducer(appReducer, []) */
  useEffect(() => {
    fetchTaskList((arr) => setStorage({ ...storage, tasks: arr }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    dashboard = <TaskListing tasks={storage.tasks} />;
  } else {
    button = (
      <Btn icon="sign-in-alt" onClick={() => setState({ isLoggedIn: true })} />
    );
    dashboard = <CreateTask />;
  }
  return (
    <div className="pt-5">
      <Greeting user={storage.name} isLoggedIn={state.isLoggedIn} />
      {dashboard}
    </div>
  );
};

function Home(props) {
  const [state, setState] = useState({
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
  });
  return (
    <SettingsContext.Provider value={[state, setState]}>
      <LoginControl />
      {props.children}
    </SettingsContext.Provider>
  );
}
const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;

function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}
function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken;
}
const App = () => {
  const token = getToken();

  return (
    <ReactRouterDOM.HashRouter>
      <div className="header header-fixed u-unselectable header-animated">
        <div className="header-brand">
          <div className="nav-item no-hover">
            <a>
              <h6 className="title">TaskApp</h6>
            </a>
          </div>
          <div className="nav-item nav-btn" id="header-btn">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="nav-right">
          <div className="nav-item active">
            <Link to="/">Home</Link>
          </div>
          <div className="nav-item">
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
      <div className="hero">
        <div className="hero-body">
          <div className="content">
            <Route path="/" component={token ? Home : Login} />
            <Route path="/login" component={Login} />
          </div>
        </div>
      </div>
    </ReactRouterDOM.HashRouter>
  );
};
ReactDOM.render(<App />, document.querySelector("#root"));
