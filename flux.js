var mountNode = document.querySelector('#mountNode');

class Counter extends React.Component {
  constructor() {
    super();
    this.state = { value: 0 };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.setState(prevState => ({
      value: prevState.value + 1
    }));
  };

  decrement() {
    this.setState(prevState => ({
      value: prevState.value - 1
    }));
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
