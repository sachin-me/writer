import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost } from "../actions";
import Message from "./Common/Message";

class Post extends Component {
  state = {
    title: "",
    bodyName: "",
    description: "",
    tags: "",
    message: null,
    error: null,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handlePost = () => {
    const { title, bodyName, description, tags } = this.state;
    if (!title || !bodyName || !description) {
      return this.setState({
        error: "*Title, body, and description are required.",
      });
    } else {
      const payload = {
        title,
        bodyName,
        description,
        tags,
      };
      this.props.dispatch(
        addPost(payload, (success) => {
          if (success) {
            this.props.history.push("/");
          }
        })
      );
    }
  };

  render() {
    const { title, description, bodyName, tags, message, error } = this.state;
    const { posts } = this.props;
    return (
      <div className="post-wrapper">
        <p>Create new Post</p>
        <div className="postForm-wrapper">
          <input
            type="text"
            name="title"
            value={title}
            id=""
            placeholder="Add Title..."
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="bodyName"
            value={bodyName}
            id=""
            placeholder="Add body..."
            onChange={this.handleChange}
          />
          <textarea
            name="description"
            id=""
            value={description}
            placeholder="Add description..."
            onChange={this.handleChange}
          ></textarea>
          <input
            type="text"
            placeholder="Add Tags..."
            name="tags"
            value={tags}
            onChange={this.handleChange}
          />
          <Message message={message} error={error} />
          <div>
            <button onClick={this.handlePost}>Post</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

export default connect(mapStateToProps)(Post);
