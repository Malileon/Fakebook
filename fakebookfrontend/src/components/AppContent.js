import * as React from "react";

import { request, setAuthHeader } from "../axios_helper";

import LoginForm from "../forms/LoginForm";
import AuthContent from "./AuthContent";

export default class AppContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentToShow: "welcome",
    };
  }

  login = () => {
    this.setState({ componentToShow: "login" });
  };

  logout = () => {
    this.setState({ componentToShow: "welcome" });
    setAuthHeader(null);
  };

  onLogin = (e, username, password) => {
    e.preventDefault();
    request("POST", "/login", {
      login: username,
      password: password,
    })
      .then((response) => {
        setAuthHeader(response.data.token);
        this.setState({ componentToShow: "messages" });
      })
      .catch((error) => {
        setAuthHeader(null);
        this.setState({ componentToShow: "welcome" });
      });
  };

  onRegister = (event, firstName, lastName, userName, password) => {
    event.preventDefault();
    request("POST", "/register", {
      firstName: firstName,
      lastName: lastName,
      login: userName,
      password: password,
    })
      .then((response) => {
        setAuthHeader(response.data.token);
        this.setState({ componentToShow: "messages" });
      })
      .catch((error) => {
        setAuthHeader(null);
        this.setState({ componentToShow: "welcome" });
      });
  };

  render() {
    return (
      <>
        {this.state.componentToShow === "welcome" && (
          <LoginForm onLogin={this.onLogin} onRegister={this.onRegister} />
        )}
        {this.state.componentToShow === "login" && (
          <LoginForm onLogin={this.onLogin} onRegister={this.onRegister} />
        )}
        {this.state.componentToShow === "messages" && <AuthContent />}
      </>
    );
  }
}
