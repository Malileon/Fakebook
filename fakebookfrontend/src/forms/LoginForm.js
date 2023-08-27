import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "login",
      firstName: "",
      lastName: "",
      login: "",
      password: "",
      onLogin: props.onLogin,
      onRegister: props.onRegister,
    };
  }

  onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  onSubmitLogin = (e) => {
    this.state.onLogin(e, this.state.login, this.state.password);
  };

  onSubmitRegister = (e) => {
    this.state.onRegister(
      e,
      this.state.firstName,
      this.state.lastName,
      this.state.login,
      this.state.password
    );
  };

  //   <ButtonGroup
  //   orientation="vertical"
  //   //   value={view}
  //   exclusive
  //   onChange={this.onChangeHandler}
  // ></ButtonGroup>
  render() {
    return (
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Button
          variant={(this.state.active = "login" ? "contained" : "text")}
          onClick={() => this.setState({ active: "login" })}
        >
          Login
        </Button>
        <Button
          variant={(this.state.active = "register" ? "outlined" : "contained")}
          onClick={() => this.setState({ active: "register" })}
        >
          Register
        </Button>
      </Box>
    );
  }
}
