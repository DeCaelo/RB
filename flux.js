var mountNode = document.querySelector('#mountNode');

let reducer = (store = { value: 0 }, action) => {
  switch (action) {
    case 'INCREMENT':
      store.value++;

      return store;
    case 'DECREMENT':
      store.value--;

      return store;
    default:
      return store;
  }
};

class Counter extends React.Component {
  constructor() {
    super();
    this.state = reducer(undefined, null);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  dispatch(action) {
    this.setState(prevState => reducer(prevState, action));
  }

  increment() {
    this.dispatch('INCREMENT');
  };

  decrement() {
    this.dispatch('DECREMENT');
  };

  render() {
    return (
      <div>
        {this.state.value}
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    )
  }
}

var CounterElement = React.createElement(Counter);

ReactDOM.render(CounterElement, mountNode);
