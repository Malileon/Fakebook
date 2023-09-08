import TextField from "@mui/material/TextField";
import { Button, Paper, responsiveFontSizes } from "@mui/material";
import * as React from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
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
      this.setState({ data: response.data });
    });
    setTimeout(() => {
      this.render();
    }, 300);
  }

  onSubmitPost = (event) => {
    var post = document.querySelector("#newPost");

    if (post.value === "") {
      window.alert("New post text was empty");
    } else {
      console.log(post.value);
    }
  };

  render() {
    this.state.data.forEach((element) => {
      console.log(element);
    });

    return (
      <div id="centerForm">
        <div id="newPostContainer">
          <TextField
            id="newPost"
            style={{ width: "69%" }}
            label="What do you want to post?"
            variant="standard"
          />
          <Button
            id="newPostBtn"
            variant="contained"
            style={{ margin: "6px", width: "8%" }}
            onClick={this.onSubmitPost}
          >
            Post
          </Button>
        </div>
        {this.state.data.map((post) => (
          <Paper
            elevation={6}
            style={{
              margin: "10px",
              padding: "15px",
              textAlign: "left",
              width: "60%",
            }}
          >
            <div id="userNameDiv">userId: {post.userId}</div>
            <div id="postContent">content: {post.content}</div>
            <div id="commentContainer">
              <TextareaAutosize id="commentArea" maxRows={4} />
              <Button
                id="newCommentBtn"
                variant="contained"
                style={{
                  margin: "6px",
                  width: "14%",
                  marginTop: "-10px",
                  maxHeight: "40px",
                }}
                onClick={this.onSubmitPost}
              >
                Comment
              </Button>
            </div>
          </Paper>
        ))}
      </div>
    );
  }
}
