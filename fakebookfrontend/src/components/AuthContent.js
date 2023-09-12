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
      comments: [],
      users: [],
    };
  }

  componentDidMount() {
    request("GET", "/getAllPosts", {}).then((response) => {
      this.setState({ data: response.data });
    });
    request("GET", "/getAllComments", {}).then((response) => {
      this.setState({ comments: response.data });
    });
    request("GET", "/getAllUsers", {}).then((response) => {
      this.setState({ users: response.data });
    });

    setTimeout(() => {
      this.render();
    }, 2000);
  }

  onSubmitPost = (event) => {
    var post = document.querySelector("#newPost");

    if (post.value === "") {
      window.alert("New post text was empty");
    } else {
      console.log(post.value);
    }
  };

  onSubmitComment = (event) => {
    var splitted = event.target.id.split("_");
    var comment = document.querySelector("#commentArea_" + splitted[1]);

    console.log(this.state.users);
  };

  render() {
    if (this.state.data && this.state.users.length != 0) {
      this.state.data.forEach((post) => {
        if (!post.author) {
          post.author =
            this.state.users[
              this.state.users.findIndex((user) => user.id == post.userId)
            ].firstName +
            " " +
            this.state.users[
              this.state.users.findIndex((user) => user.id == post.userId)
            ].lastName;
        }
      });
    }

    return (
      <div id="centerForm">
        <div id="newPostContainer">
          <TextField
            id="newPost"
            style={{ width: "68%" }}
            label="What do you want to post?"
            variant="standard"
          />
          <Button
            id="newPostBtn"
            variant="contained"
            style={{ margin: "6px", width: "9%" }}
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
            <div id="userNameDiv">{post.author}</div>
            <div id="postContent">{post.content}</div>
            <div id="commentContainer">
              <TextareaAutosize
                id={"commentArea_" + post.id}
                className="commentArea"
                maxRows={4}
              />
              <Button
                id={"newCommentBtn_" + post.id}
                variant="contained"
                style={{
                  margin: "6px",
                  width: "14%",
                  marginTop: "-10px",
                  maxHeight: "40px",
                }}
                onClick={this.onSubmitComment}
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
