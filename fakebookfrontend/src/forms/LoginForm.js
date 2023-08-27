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
          onClick={() => {
            this.setState({ active: "login" });
          }}
          variant={this.state.active === "login" ? "contained" : "outlined"}
        >
          Login
        </Button>
        <Button
          onClick={() => {
            this.setState({ active: "register" });
          }}
          variant={this.state.active === "register" ? "contained" : "outlined"}
        >
          Register
        </Button>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            display: this.state.active === "register" ? "none" : "",
          }}
          noValidate
          autoComplete="off"
        >
          Login forma tu
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            display: this.state.active === "login" ? "none" : "",
          }}
          noValidate
          autoComplete="off"
        >
          Register forma tu
        </Box>
      </Box>
    );
  }
}
