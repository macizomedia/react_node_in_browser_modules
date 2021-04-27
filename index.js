const SettingsContext = React.createContext() // We use create context for global settings
const root = document.getElementById('root')
/* This is a minimal ReactApp setUp using cdn, we explore differents components and Syntax */
var model = [{ "title": "Alert", "id": 87, "priority": "24", "due": "in 8 hours", "isDone": false, "timer": "April 26th 2021, 4:06:25 pm" },
{ "title": "Alert", "id": 87, "priority": "24", "due": "in 8 hours", "isDone": false, "timer": "April 26th 2021, 4:06:25 pm" },
{ "title": "Penada", "id": 98, "priority": "24", "due": "in 8 hours", "isDone": false, "timer": "April 26th 2021, 4:06:25 pm" }]
function LoginButton(props) {
    return (
        <button className="btn btn-outline-info" onClick={props.onClick}>
            <i className="fa fa-sign-in-alt" aria-hidden="true"></i>
        </button>
    )
}
/* Both buttons are similar in form we can make a more generic Button*/
function LogoutButton(props) {
    return (
        <button className="btn btn-outline-warning" onClick={props.onClick}>
            <i className="fa fa-sign-out-alt" aria-hidden="true" />
        </button>
    )
}
/* This button is more reusable & has better readability because destructuring */
function ControlButton({ onClick, name, isLoggedIn }) {
    return (
        <button
            className={
                // inside class we can create ternary to conditionaly render styles
                isLoggedIn ? 'btn btn-primary' : 'btn btn-secondary'
            }
            onClick={onClick}
        >
            {name}
        </button>
    )
}
/* Btn is even more reusable as allow us to change the icon, name & active state */
const Btn = ({ id, icon, name, isActive, onClick }) => (
    <i
        type="button"
        onClick={onClick}
        className={`fa fa-${icon} btn btn-outline-${isActive ? 'primary' : 'secondary'
            }`}
        id={id}
        name={name}
    ></i>
)
/* Title component is another example of using ternary */
const Title = ({ title }) => {
    return title.length > 4 ? <h1>Hello, {title}</h1> : <ActionLink id="item" name="cogs" icon="cog" fn={(x) => console.log(window.document.getElementById(x))} />
}

/* ActionLink combined with Btn components creates reusable pieces of code */
function ActionLink({ id, name, icon, fn }) {
    function handleClick(e) {
        e.preventDefault()
        fn()
    }
    return (
        <Btn id={id} name={name} icon={icon} isActive="false" onClick={handleClick} />
    )
}
/* MAIN COMPONENTS AREA */
/* Navegation is wrapped on LogingControl component*/
function Navigation({ button }) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">
                    Task Manager
                </a>
                {button}
            </nav>
        </div>
    )
}
/* GREETINGS COMPONENT */
/* To understand state, we create a global user variable */
var globalUser = ''
/* Custom setState function for our globalUser var */
const setUser = (val) => {
    globalUser = val
    window.localStorage.setItem('user', JSON.stringify(globalUser))
    window.document.getElementById('user').value = ''
}

function GuestGreeting(props) {
    const [input, setInput] = React.useState(props.user)
    return (
        <div className="container-flex m-3 p-2 bg-dark">
            <Title className="display-5" title={input} />
            <div className="row justify-content-center">
                <label htmlFor="user"></label>
                <input
                    onChange={(e) => setInput(e.target.value)}
                    value={input.name}
                    type="text"
                    className="col-8 form-control m-2"
                    name="name"
                    id="user"
                    aria-describedby="helpId"
                    placeholder="Type your name"
                />
                <button
                    onClick={() => setUser(input)} // We safe the user to the LocalStorage!
                    type="button"
                    className="col-4 btn btn-secondary"
                >
                    Set
                </button>
            </div>
            <small id="helpId" className="form-text text-muted">
                v.1 @macizomedia
            </small>
        </div>
    )
}

/* Greeting is wrapped on loginControl Component & conditionally renders with isLoggedIn */
function Greeting({ user, isLoggedIn }) {
    const prevUser = JSON.parse(window.localStorage.getItem('user'))
    /* Greeting is a nested component we want to set the user on our app context */
    const { settings, setSettings } = React.useContext(SettingsContext)
    if (isLoggedIn) {
        return (
            <div className="jumbotron">
                <h1 className="display-5">{`Hello, ${user}`}</h1>
                <p className="lead">
                    {settings}
                </p>
                <hr className="my-4" />
                <p>
                    It uses utility classes for typography and spacing to space
                    content out within the larger container.
                </p>
                <p className="lead">
                    <Btn isActive={isLoggedIn} icon="user" name="set" onClick={() => setSettings(user)} />
                </p>
                {/* <h5 className="display-5">Previous User </h5>
                <div>New user is {settings}</div>
                <button
                    className="btn btn-outline-danger"
                    onClick={() => setSettings(props.user)}
                >
                    Set Context
                </button> */}
            </div>
        )
    }
    return <GuestGreeting user={prevUser} className="p-2" />
}
/* TASK COMPONENTS */
const Task = ({ title, isDone, priority, timer, id, due, onClick }) => {
    //const handleClick = () = this.
    return (
        <div div={id} className="card m-3 p-3 bg-dark">

            <h4 className={`card-header text-${priority < 50 ? 'warning' : 'info'} text-${isDone ? 'primary' : 'secondary'
                }`}>{title}</h4>
            <div className="card-body w-100 p-2 m-3">
                <small className=""> created at {timer}</small>
                <p className="mb-1">{id}</p>
                <small>{due}</small>
            </div>
            <Btn className="card-footer w-25" name='bin' icon='trash' onClick={onClick} />

        </div>
    )
}
const TaskListing = ({ tasks }) =>
    tasks.map(
        (item, i) => (
            (
                <Task
                    title={item.title}
                    key={i}
                    id={item.id}
                    isDone={item.isDone}
                    priority={item.priority}
                    timer={item.timer}
                    due={item.due}
                    onClick={() => fetch('http://mmcs:3000/tasks', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                        body: item.id
                    }).then(res => console.log(res))}
                />
            )
        )
    )

const InputElem = ({ label, type, id, help, onChange, value }) => {
    return (
        <div className="p-3">
            <label htmlFor={id}>{label}</label>
            <input
                onChange={onChange}
                type={type}
                className="form-control"
                id={id}
                value={value}
                aria-describedby="emailHelp"
                placeholder={`enter ${id}`}
            />
            <small id="emailHelp" className="form-text text-muted">
                {help}
            </small>
        </div>
    )
}
/* TASK UTILS */
/* To understand state, we create a global user variable */
var taskList = []
/* Custom setState function for our globalTask var */
const saveTask = (val) => {
    taskList.push(val)
    let rawData = JSON.stringify(val, null, 2)
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: rawData,
    }
    fetch('http://mmcs:3000/echo', fetchOptions)
        .then((response) => response.body)
        .then((rb) => {
            const reader = rb.getReader()

            return new ReadableStream({
                start(controller) {
                    // The following function handles each data chunk
                    function push() {
                        // "done" is a Boolean and value a "Uint8Array"
                        reader.read().then(({ done, value }) => {
                            // If there is no more data to read
                            if (done) {
                                console.log('done', done)
                                controller.close()
                                return
                            }
                            // Get the data and send it to the browser via the controller
                            controller.enqueue(value)
                            // Check chunks by logging to the console
                            console.log(done, value)
                            push()
                        })
                    }

                    push()
                },
            })
        })
        .then((stream) => {
            // Respond with our stream
            return new Response(stream, {
                headers: { 'Content-Type': 'text/html' },
            }).text()
        })
        .then((result) => {
            taskList.push(result)
            console.log(result)
        })
}

const fetchTaskList = (fn) => {
    //let rawData = JSON.stringify(val, null, 2)
    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    }
    fetch('http://mmcs:3000/tasks', fetchOptions)
        .then((response) => response.body)
        .then((rb) => {
            const reader = rb.getReader()

            return new ReadableStream({
                start(controller) {
                    // The following function handles each data chunk
                    function push() {
                        // "done" is a Boolean and value a "Uint8Array"
                        reader.read().then(({ done, value }) => {
                            // If there is no more data to read
                            if (done) {
                                console.log('done', done)
                                controller.close()
                                return
                            }
                            // Get the data and send it to the browser via the controller
                            controller.enqueue(value)
                            // Check chunks by logging to the console
                            console.log(done, value)
                            push()
                        })
                    }

                    push()
                },
            })
        })
        .then((stream) => {
            // Respond with our stream
            return new Response(stream, {
                headers: { 'Content-Type': 'text/html' },
            }).text()
        })
        .then((result) => {
            fn(JSON.parse(result))
        })
}
/* CREATE TASK  */
class CreateTask extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            title: '',
            id: 3,
            priority: 0,
            due: '',
            isDone: false,
            timer: moment().format('MMMM Do YYYY, h:mm:ss a'),
            onClick: (e) => console.log(e)
        }
    }
    handleClick(e) {
        this.setState({ title: e.target.value })
        e.target.value = ''
    }
    handleSubmit = (event) => {
        event.preventDefault()
        //alert(`A task was added: ${JSON.stringify(this.state)}`)
        saveTask(this.state)
        this.setState()
    }
    render() {
        return (
            <form
                className="form-group p-3"
                onSubmit={(event) => this.handleSubmit(event)}
            >
                <InputElem
                    label="enter task"
                    type="text"
                    id="taskInput"
                    help="What are we doing?"
                    value={this.state.title}
                    onChange={(e) =>
                        this.setState({
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
                    value={this.state.priority}
                    onChange={(e) =>
                        this.setState({
                            priority: e.target.value,
                            due: moment().endOf('day').fromNow(),
                        })
                    }
                />
                <input type="submit" value="Submit" />
            </form>
        )
    }
}
/* AUTH CONTROL */
/* Login Component is wrap inside App */
class LoginControl extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.state = { isLoggedIn: false, storage: [] }
    }
    handleClick() {
        this.setState({ isLoggedIn: !this.state.isLoggedIn })
    }
    componentDidMount() {
        fetchTaskList((arr) => this.setState({ storage: arr }))

        console.log(this.state)
    }
    componentWillUnmount() { }
    render() {
        const isLoggedIn = this.state.isLoggedIn
        const storage = this.state.storage
        let button
        let dashboard
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleClick} />
            dashboard = <TaskListing tasks={storage} />
        } else {
            button = <LoginButton onClick={this.handleClick} />
            dashboard = <CreateTask />
        }
        return (
            <div>
                <Navigation button={button} />
                <Greeting user={globalUser} isLoggedIn={isLoggedIn} />
                {dashboard}
            </div>
        )
    }
}
/* App Component provides the context State */
function App() {
    const [settings, setSettings] = React.useState([])

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            <LoginControl />
        </SettingsContext.Provider>
    )
}
ReactDOM.render(<App />, root)

/*
function allStorage() {
    var values = [],
    keys = Object.keys(localStorage),
        i = keys.length
    while (i--) {
        values.push(localStorage.getItem(keys[i]))
    }

    return values
}
this.state.storage = allStorage() */
