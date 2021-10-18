import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPost, deletePost } from "../actions";
import Message from "./Common/Message";

class MainContent extends Component {
  state = {
    showError: false,
  };
  handleDelete = (id) => {
    const { user } = this.props;
    if (Object.keys(user).length === 0) {
      this.setState({
        showError: true,
      });
    }
    this.props.dispatch(
      deletePost(id, (success) => {
        if (success) {
          this.props.dispatch(getPost());
        }
      })
    );
  };

  navigateEdit = (id) => {
    const { user } = this.props;
    if (Object.keys(user).length === 0) {
      this.setState({
        showError: true,
      });
    } else {
      this.props.history.push(`/post/${id}/edit`);
    }
  };

  componentDidMount = () => {
    this.props.dispatch(getPost());
  };

  render() {
    const { posts, error } = this.props;
    const { showError } = this.state;
    return (
      <div className="mainContent-wrapper">
        {(posts.length !== 0 &&
          posts.map((post) => {
            return (
              <div key={post._id} className="post-card">
                <Link to={`post/${post._id}`}>
                  <h1>{post.title}</h1>
                </Link>
                {error && showError && <Message error={error} message={""} />}
                <button onClick={(id) => this.handleDelete(post._id)}>
                  Delete
                </button>{" "}
                <button
                  onClick={() => this.navigateEdit(post._id)}
                  className="edit-btn"
                >
                  Edit
                </button>
              </div>
            );
          })) || <div className="center">No post found 😥 </div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    error: state.error,
    user: state.user,
  };
};

export default connect(mapStateToProps)(MainContent);
