import React from "react";
import logo from '../assets/images/logo.svg';

const Some = React.forwardRef((props, ref) => {
  return (
    <span ref={ref} style={{ fontSize: '0.24rem' }} {...props}>
      Some Component
    </span>
  );
});

export class RefDemo extends React.Component {
  constructor(props) {
    super(props);
    this.others = React.createRef();
    this.span = React.createRef();
  }

  componentDidMount() {
    this.refs.a.textContent = "Update By Refs";
    this.btn.textContent = "Update By Ref Function";
    this.others.current.textContent = "Update By createRef";
    this.span.current.textContent = "Update By forwardRef";
  }

  render() {
    return (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            ref="a"
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button ref={node => this.btn = node} className="App-btn">
            Learn React
          </button>
          <button ref={this.others} className="App-btn">
            Learn React
          </button>
          <Some ref={this.span}/>
        </header>
    );
  }
}
