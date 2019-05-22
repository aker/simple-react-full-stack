import React, {Component} from "react";
import {AuthProvider} from "../authContext";

class Auth extends Component {
  state = {
    authenticated: false,
    user: {
      role: "visitor"
    },
    accessToken: ""
  };

  initiateLogin = () => {
    window.location.href = '/auth';
  };

  logout = () => {
    this.setState({
      authenticated: false,
      user: {
        role: "visitor"
      },
      accessToken: ""
    });
  };

  handleAuthentication = () => {
    console.log("Auth.js:window.location = ", window.location);
    fetch("/token/" + window.location.search)
      .then(res => res.json())
      .then((data) => {
        console.log("Auth.js:data = ", data);
        this.setSession(data);
      });
  };

  setSession(data) {
    const user = {
      id: data.sub,
      email: data.email,
      authorities: data.authorities,
      permissions: data.permissions,
      role: data.role
    };
    this.setState({
      authenticated: true,
      accessToken: data.accessToken,
      user
    });

    sessionStorage.setItem("access_token", data.accessToken);
    sessionStorage.setItem("permissions", data.permissions);
  }

  render() {
    const authProviderValue = {
      ...this.state,
      initiateLogin: this.initiateLogin,
      handleAuthentication: this.handleAuthentication,
      logout: this.logout
    };
    return (
      <AuthProvider value={authProviderValue}>
        {this.props.children}
      </AuthProvider>
    );
  }
}

export default Auth;
