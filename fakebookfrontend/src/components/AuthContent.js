import { ThirtyFpsTwoTone } from "@mui/icons-material";
import { responsiveFontSizes } from "@mui/material";
import * as React from "react";

import { request } from "../axios_helper";

export default class AuthContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    request("GET", "/getAllPosts", {}).then((response) => {
      // this.setState({ data: JSON.stringify(response.data) });
      // console.log("Data ", response.data)
      this.setState({ data: response.data });
      // test = JSON.parse(response.data[0);
      // console.log(Array.isArray(response.data));
    });
    setTimeout(() => {
      // console.log(this.state.data.length);
      this.render();
    }, 300);
  }

  render() {
    console.log("render?");
    this.state.data.forEach((element) => {
      console.log(element.id);
    });
    return (
      <div>
        {/* {this.state.data.forEach((element) => {
          
        })} */}
      </div>
    );
    // return <div>{this.state.data[1]}</div>;
  }
}
