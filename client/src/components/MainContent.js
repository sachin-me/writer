import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost, deletePost } from '../actions';
import MiddleHoc from './MiddleHoc';


class MainContent extends Component {

  handleDelete = (id) => {
    this.props.dispatch(deletePost(id));
  }

  componentDidMount = () => {
    this.props.dispatch(getPost());
  }

  render() {
    const { posts } = this.props;
   
    return (
      <div className="mainContent-wrapper">
        {
          posts && posts.map((post) => {
            return (
              <div key={post._id}>
                <Link to={`post/${post._id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <button onClick={(id) => this.handleDelete(post._id)}>Delete</button>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps)(MainContent);