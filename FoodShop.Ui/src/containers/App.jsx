import React, {Component} from 'react';

class App extends Component {
  render() {
    const { children } = this.props;
    return (<div className="body">{children}</div>);
  }
}

export default App;
