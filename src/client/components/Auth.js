import React, {Component} from "react";
import {AuthProvider} from "../authContext";
import ErpApi from "../utils/api";

class Auth extends Component {
  state = {
    authenticated: false,
    user: {
      role: "visitor",
      permissions: "",
    },
    accessToken: "",
    baseURL: "/",
    roles: null,
  };
  
  logout = () => {
    this.setState({
      authenticated: false,
      user: {
        role: "visitor",
        permissions: "",
      },
      accessToken: "",
      baseURL: "/",
      roles: null,
    });

    localStorage.removeItem("access_token");
    localStorage.removeItem("base_url");
  };

  initiateLogin = () => {
    window.location.href = '/auth';
  };

  handleAuthentication = () => {
    console.log("Auth.js:window.location = ", window.location);
    fetch("/token/" + window.location.search)
      .then(res => res.json())
      .then((data) => {
        console.log("Auth.js:data = ", data);
        this.setSession(data);
        this.initDatas(data);
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
    
    localStorage.setItem("base_url", 'http://localhost:8080/api');
    localStorage.setItem("access_token", data.accessToken);

    this.setState({
      authenticated: true,
      accessToken: data.accessToken,
      user
    });
  }

  initDatas(data) {
    ErpApi.get('/roles', {
      baseURL: data.baseApiURL,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + data.accessToken,
      }
    }).then(response => {
          console.log("roleslist.data:", response.data);
          this.setState({roles: response.data});
    });
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
