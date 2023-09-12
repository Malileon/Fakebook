import TextField from "@mui/material/TextField";
import { Button, Paper, responsiveFontSizes } from "@mui/material";
import * as React from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { request } from "../axios_helper";
import Appbar from "./Appbar";

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
    var actualId;
    this.state.users.forEach((user) => {
      console.log(user);
      if (user.login === this.props.mail) {
        actualId = user.id;
      }
    });

    if (post.value === "") {
      window.alert("New post text field was empty");
    } else {
      event.preventDefault();
      console.log("actualId ", actualId);
      request("POST", "/savePost", {
        userId: actualId,
        content: post.value,
      })
        .then((response) => {
          console.log("PostResponse ", response);
        })
        .catch((error) => {
          console.log("?", error);
        });

      post.value = null;

      setTimeout(() => {
        this.componentDidMount();
      }, 200);
    }
  };

  onSubmitComment = (event) => {
    var splitted = event.target.id.split("_");
    var comment = document.querySelector("#commentArea_" + splitted[1]);
    var actualId;
    this.state.users.forEach((user) => {
      console.log(user);
      if (user.login === this.props.mail) {
        actualId = user.id;
      }
    });

    if (comment.value === "") {
      window.alert("Corresponding comment textbox was empty");
    } else {
      event.preventDefault();
      request("POST", "/saveComment", {
        userId: actualId,
        content: comment.value,
        postId: splitted[1],
      })
        .then((response) => {
          console.log("CommentResponse ", response);
        })
        .catch((error) => {
          console.log("?", error);
        });

      comment.value = null;

      setTimeout(() => {
        this.componentDidMount();
      }, 200);
    }
  };

  getUserFromId(fromId) {
    var fullName;
    this.state.users.forEach((user) => {
      if (user.id == fromId) {
        fullName = user.firstName + " " + user.lastName;
      }
    });
    return fullName;
  }

  generateComment(comment, post) {
    if (comment.postId === post.id) {
      let userFullName = this.getUserFromId(post.userId);

      return (
        <Paper className="singleCommentPaper" elevation={12}>
          <div className="commentName">{userFullName}</div>
          <div>{comment.content}</div>
        </Paper>
      );
    }
  }

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
      <div>
        <Appbar />
        <div id="centerForm">
          <div id="newPostContainer">
            <TextField
              id="newPost"
              sx={{ width: "68%" }}
              InputProps={{ sx: { width: "100%" } }}
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
                <Paper className="commentPaper" elevation={9}>
                  <TextareaAutosize
                    placeholder="Comment..."
                    id={"commentArea_" + post.id}
                    className="commentArea"
                    maxRows={4}
                  />
                  <Button
                    id={"newCommentBtn_" + post.id}
                    className="commentBtn"
                    variant="contained"
                    style={{
                      maxHeight: "40px",
                    }}
                    onClick={this.onSubmitComment}
                  >
                    Comment
                  </Button>
                  {this.state.comments.map((comment) => (
                    <div>{this.generateComment(comment, post)}</div>
                  ))}
                </Paper>
              </div>
            </Paper>
          ))}
        </div>
      </div>
    );
  }
}
