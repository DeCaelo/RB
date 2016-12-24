var mountNode = document.querySelector('#mountNode');

// Router declarations
var
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    DefaultRoute = ReactRouter.DefaultRoute,
    Link = ReactRouter.Link,
    RouteHandler = ReactRouter.RouteHandler,
    IndexRoute = ReactRouter.IndexRoute,
    CSSTransitionGroup = React.addons.CSSTransitionGroup
;

/**
 *
 */
class AddComponent extends React.Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
    }

    submit(e) {
        e.preventDefault();

        this.props.onSubmit({user: this.props.name, task: this.input.value});
        this.input.value = "";
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                <h2>Assigner une tâche :</h2>
                <input ref={(input) => this.input = input} onChange={this.update} placeholder="doit faire ..." />
                <button>Ajouter</button>
            </form>
        );
    }
}

let mainReducer = (store = MainComponent.getData(), action) => {
    switch (action.type) {
        case 'ADD_TASK':
            store.items.push(action.value);

            return store;
        case 'CHANGE_USER':
            store.actual = store.users[action.value].name;

            return store;
        default:
            return store;
    }
}

/**
 *
 */
class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = mainReducer(undefined, {});
        this.changeName = this.changeName.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    static getData() {
        return {
            actual: "Julien",
            users: [
                {name: "Julien", role: "lead-dev", age: 34},
                {name: "Christophe", role: "dev junior", age: 24},
                {name: "Roby", role: "dev junior", age: 23}
            ],
            items: []
        };
    }

    dispatch(action, value) {
        this.setState(prevState => mainReducer(prevState, {type: action, value: value}));
    }

    changeName(key) {
        this.dispatch('CHANGE_USER', key);
    }

    addTask(item) {
        this.dispatch('ADD_TASK', item);
    }

    render() {
        return (
            <div>
                <MenuComponent />
                <h1
                style={{color: this.props.color}}
                >
                Tâche pour {this.state.actual}!
                </h1>

                <h2>Choisir un membre :</h2>
                <ul>
                    {this.state.users.map((user, i) => {
                        var change = this.changeName.bind(this, i);
                        return <li key={i} onClick={change}>{user.name}</li>;
                    })}
                </ul>

                <h2 className={this.state.items.length ? '' : 'hidden'}>Tâches :</h2>
                <ul>
                    <CSSTransitionGroup
                        className="animateExample"
                        transitionEnterTimeout={250}
                        transitionLeaveTimeout={250}
                        transitionName="example">
                        {this.state.items.map((item, i) => {
                            return <li key={i}>{item.task} pour {item.user}</li>;
                        })}
                    </CSSTransitionGroup>
                </ul>

                <AddComponent onSubmit={this.addTask} name={this.state.actual} />
            </div>
        );
    }
}

/**
 *
 */
class UsersComponent extends React.Component {
    render() {
        return (
            <div>
                <MenuComponent />
                <div>
                    <h1>Utilisateurs</h1>
                    <ul>
                        {MainComponent.getData().users.map((user, i) => {
                            return <li key={i}><Link to={`users/${i}`}>{user.name}</Link></li>;
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

/**
 *
 */
class UserComponent extends React.Component {
    constructor(props) {
        super(props);

        this.user = MainComponent.getData().users[props.routeParams.id];
    }

    render() {
        return (
            <div>
                <MenuComponent />
                <div>
                    <h1>Fiche de {this.user.name}</h1>
                    <p>{this.user.role}</p>
                    <p>{this.user.age}ans</p>
                </div>
            </div>
        );
    }
}

/**
 *
 */
class MenuComponent extends React.Component {
    render() {
        return (
            <ul>
                <li><Link to={`/`} activeClassName="active">Home</Link></li>
                <li><Link to={`/users`} activeClassName="activeUser">Utilisateurs</Link></li>
                <li><Link to={{pathname: `/users/user`, query: { getTasks: false }}} activeClassName="activeUser">Un seul utilisateur</Link></li>
            </ul>
        );
    }
}

MainComponent.defaultProps = {
    color: 'blue'
};

MainComponent.propTypes = {
    color: React.PropTypes.string.isRequired
};

ReactDOM.render((
    <Router>
        <Route path="/" component={MainComponent} />
        <Route name="users" path="users">
            <IndexRoute component={UsersComponent} />
            <Route path=":id" component={UserComponent} />
        </Route>
    </Router>
), mountNode);
