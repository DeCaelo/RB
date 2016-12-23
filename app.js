var mountNode = document.getElementById('mountNode');

// Router declarations
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var Link = ReactRouter.Link;
var RouteHandler = ReactRouter.RouteHandler;
var IndexRoute = ReactRouter.IndexRoute;

class AddComponent extends React.Component {
    constructor() {
        super();
        this.update = this.update.bind(this);
        this.submit = this.submit.bind(this);
    }

    update() {
        this.setState({query: this.input.value});
    }

    submit(e) {
        e.preventDefault();
        this.props.onSubmit({task: this.props.name + ' ' + this.input.value});
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

class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = MainComponent.getData();
        this.changeName = this.changeName.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    componentWillMount() {
      this.props.history.push('/users');
    }

    static getData() {
        return {actual: "Julien", users: ["Julien", "Christophe", "Roby"], items: []};
    }

    changeName(key) {
        this.setState({actual: this.state.users[key]});
    }

    addItem(item) {
        this.setState({items: this.state.items.concat([item])});
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
                    return <li key={user} onClick={change}>{user}</li>;
                })}
                </ul>

                <h2 className={this.state.items.length ? '' : 'hidden'}>Tâches :</h2>
                <ul>
                {this.state.items.map((item, i) => {
                    return <li key={i}>{item.task}</li>;
                })}
                </ul>

                <AddComponent onSubmit={this.addItem} name={this.state.actual} />
            </div>
        );
    }
}

class UsersComponent extends React.Component {
    render() {
      return (
        <div>
          <MenuComponent />
          <div>
            <h1>Utilisateurs</h1>
            <p>... Liste ...</p>
          </div>
        </div>
        );
    }
}

class UserComponent extends React.Component {
    constructor(props) {
      super(props);

      this.getTasks = props.location.query.getTasks;
      this.name = props.routeParams.name;
    }

    render() {
      return (
        <div>
          <MenuComponent />
          <div>
            <h1>Utilisateur</h1>
            <p>{this.name}</p>
          </div>
        </div>
        );
    }
}

class MenuComponent extends React.Component {
   render() {
      return (
        <ul>
          <li><Link to={`/`} activeClassName="active">Accueil</Link></li>
          <li><Link to={`/users`} activeClassName="active">Utilisateurs</Link></li>
          <li><Link to={{pathname: `/users/user`, query: { getTasks: true }}} activeClassName="active">Utilisateur</Link></li>
        </ul>
        );
    }
}

MainComponent.defaultProps = {color: 'blue'};

MainComponent.propTypes = {
color: React.PropTypes.string.isRequired
};

ReactDOM.render((
    <Router>
        <Route path="/" component={MainComponent} />
        <Route path="users">
            <IndexRoute component={UsersComponent} />
            <Route path=":name" component={UserComponent} />
        </Route>
    </Router>
), mountNode);
