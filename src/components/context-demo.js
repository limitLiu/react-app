import React from "react";

const Context = React.createContext('');

export class ContextDemo extends React.Component {
  state = {
    value: '',
  };

  render() {
    return (
      <Context.Provider value={this.state.value}>
        <div className="context-container">
          <input className="context-container__input" value={this.state.value}
                 onChange={event => this.setState({ value: event.target.value })}/>
          <Child1/>
          <Child2/>
          <Child3/>
        </div>
      </Context.Provider>
    );
  }
}

class Child1 extends React.Component {
  static contextType = Context;

  render() {
    return (
      <div style={{ fontSize: '0.24rem' }}>
        {this.context}
      </div>
    );
  }
}

function Child2() {
  return (
    <div style={{ fontSize: '0.24rem' }}>
      <Context.Consumer>
        {value => value}
      </Context.Consumer>
    </div>
  );
}

function Child3() {
  const value = React.useContext(Context);
  return (
    <div style={{ fontSize: '0.24rem' }}>
      {value}
    </div>
  );
}
