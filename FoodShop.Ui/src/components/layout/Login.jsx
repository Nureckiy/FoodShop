import React, { Component } from 'react';

class Login extends Component {
  componentWillMount() {
    this.props.route.auth.login();
  }

  render() {
    return (
      <h1>Login to Hohotel</h1>
    );
  }
}

export default Login;
