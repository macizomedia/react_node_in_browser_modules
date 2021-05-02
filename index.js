console.log(datetimepickerFactory)
jQuery.datetimepicker.setLocale('en');
const settings = {
    theme: {

        light: {
            foreground: "#000000",
            background: "#eeeeee"
        },
        dark: {
            foreground: "#ffffff",
            background: "#222222"
        }
    },
    name: 'admin',
    tasks: [{ "title": "Alert", "id": 87, "priority": "24", "due": "in 8 hours", "isDone": false, "timer": "April 26th 2021, 4:06:25 pm" },
    { "title": "Alert", "id": 87, "priority": "24", "due": "in 8 hours", "isDone": false, "timer": "April 26th 2021, 4:06:25 pm" },
    { "title": "Penada", "id": 98, "priority": "24", "due": "in 8 hours", "isDone": false, "timer": "April 26th 2021, 4:06:25 pm" }]
};
const SettingsContext = React.createContext(settings)
const root = document.getElementById('root')

const DatePick = () => {
    jQuery('#datetimepicker').datepicker({
                format: 'Y-m-d H:i',
                inline: true
            });
    // const [startDate, setStartDate] = React.useState(new Date().toISOString());
    return (
        <input id="datetimepicker" className="xdsoft_datetimepicker" type="text"/>
    );
};

const Btn = ({ id, type, icon, name, isActive, onClick }) => (
    <button
        className={`btn btn-outline-${isActive ? 'primary' : 'secondary'}`}
        onClick={onClick}
        type={type}
        name={name}
        id={id}>
        <i
            className={`fa fa-${icon} 
                }`}
        ></i>
    </button>
)
Btn.defaultProps = {
    type: "button"
}
/* Title component is another example of using ternary */
const Title = ({ title, state }) => {

    return (
        <div className="mt-2">
            <h1>Hello, {title} </h1>
            <p>Current {state}</p>
        </div>
    )
}

const Form = () => {
    const handleChange = (e) => {
        e.persist()

        setUser(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    return (
        <div>
            <p></p>
        </div>
    )
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
                <a className="navbar-brand" href="/">
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

function GuestGreeting({ user, state }) {
    const [input, setInput] = React.useState(user)
    return (
        <div className="container-flex m-3 p-2 bg-dark">
            <Title className="display-5" title={input} state={state} />
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
    if (isLoggedIn) {
        return (
            <div className="jumbotron">
                <h1 className="display-5">{`Hello, ${user}`}</h1>
                <p className="lead">
                    {settings.name}
                </p>
                <hr className="my-4" />
                <p>
                    It uses utility classes for typography and spacing to space
                    content out within the larger container.
                </p>
                <p className="lead">
                    <Btn isActive={isLoggedIn} icon="user" name="set" onClick={null} />
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
    return <GuestGreeting user={prevUser} state={settings.name} className="p-2" />
}
/* TASK COMPONENTS */
const Task = ({ title, isDone, priority, timer, id, due, onClick, onEdit }) => {
    if (!isDone) {
        return (
            <div id={id} className="list-group">
                <a href={`${id}`} className="list-group-item list-group-item-action flex-column align-items-start">

                    <div className="card text-white bg-secondary mt-3">
                        <div className="card-header col-10 ">
                            <h4 id={`${id}-text`} className={` text-${priority < 50 ? 'warning' : 'info'} text-${isDone ? 'primary' : 'secondary'
                                }`}>{title}</h4>
                        </div>
                        <div className="card-body w-100 p-2 m-3">
                            <small className=""> created at {timer}</small>
                            <p className="mb-1">{id}</p>
                            <small>{due}</small>
                        </div>
                        <div className="card-footer bg-warning d-flex">
                            <Btn className="col-2 text-info" name='edit' icon='edit' onClick={onEdit} />
                            <Btn className="col-2 card-footer w-25" name='bin' icon='trash' onClick={onClick} />
                        </div>

                    </div>
                </a>
            </div>
        )
    } else {
        return (

            <div className="modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Open">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Save changes</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const TaskListing = ({ tasks }) => {

    return tasks.map(
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
                    onClick={(event) => {
                        event.preventDefault()
                        const elem = window.document.getElementById(item.id)
                        elem.innerHTML = '<div class="m-3"><h1 class="display-3 text-center">Deleting...</h1></div>'
                        setTimeout(() => {
                            elem.hidden = true
                        }, 1640)
                        fetch('http://mmcs:3000/delete', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json',
                            },
                            body: item.id
                        }).then(res => console.log(res))
                    }}
                    onEdit={(event) => {
                        event.preventDefault()
                        const elem = window.document.getElementById(`${item.id}-text`)
                        elem.innerHTML = "DONE!!"
                        item.isDone = true
                    }}
                />
            )
        )
    )
}

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
                <DatePick />
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
                <input className="btn btn-outline-primary btn-lg btn-block" type="submit" value="Submit" />
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
    fetchData() {
        fetchTaskList((arr) => this.setState({ storage: arr }))
    }
    handleClick() {
        this.fetchData()
        this.setState({ isLoggedIn: !this.state.isLoggedIn })
    }
    componentDidMount() {
        console.log(this.state.storage)
    }
    componentDidUpdate() {

    }
    componentWillUnmount() { }
    render() {
        const isLoggedIn = this.state.isLoggedIn
        const storage = this.state.storage
        let button
        let dashboard
        if (isLoggedIn) {
            button = <Btn name="logout" icon="sign-out-alt" onClick={this.handleClick} />
            dashboard = <TaskListing tasks={storage} />
        } else {
            button = <Btn icon="sign-in-alt" onClick={this.handleClick} />
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

function App() {

    return (
        <SettingsContext.Provider value={settings}>
            <LoginControl />
        </SettingsContext.Provider>
    )
}
ReactDOM.render(<App />, root)