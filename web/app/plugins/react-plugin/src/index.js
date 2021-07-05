// in src/index.js

// Added lines to use wp.element instead of importing React
const { Component, render } = wp.element;
class Timer extends Component {
    constructor(props) {
      super(props);
      this.state = { seconds: 0 };
    }
  
    tick() {
      this.setState(state => ({
        seconds: state.seconds + 1
      }));
    }
  
    componentDidMount() {
      this.interval = setInterval(() => this.tick(), 1000);
    }
  
    componentWillUnmount() {
      clearInterval(this.interval);
    }
  
    render() {
      return (
        <div>
          Secondes : {this.state.seconds}
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <Timer />,
    document.getElementById('app')
  );