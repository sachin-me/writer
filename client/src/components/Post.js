import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { addPost, getPost, deletePost } from '../actions';

class Post extends Component {
  state = {
    title: '',
    bodyName: '',
    description: '',
    tags: ''
  }

  handleTitle = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handlePost = () => {
    for (let key in this.state) {
      if (!(this.state[key])) return
    }
    this.props.dispatch(addPost(this.state, (succeed) => {
      if (succeed) {
        this.props.dispatch(getPost())
      }
    }))
    this.setState({
      title: '',
      bodyName: '',
      description: '',
      tags: ''
    })
  }

  componentDidMount = () => {
    this.props.dispatch(getPost());
  }

  render() {
    const { title, description, bodyName, tags } = this.state;
    const { posts } = this.props;
    return (
      <div className="post-wrapper">
        <p>Create new Post</p>
        <div className="postForm-wrapper">
          <input type="text" name="title" value={title} id="" placeholder="Add Title..." onChange={this.handleTitle} />
          <input type="text" name="bodyName" value={bodyName} id="" placeholder="Add body..." onChange={this.handleTitle} />
          <textarea name="description" id="" value={description} placeholder="Add description..." onChange={this.handleTitle}></textarea>
          <input type="text" placeholder="Add Tags..." name="tags" value={tags} onChange={this.handleTitle} />
          <div>
            <Link to="/">
              <button onClick={this.handlePost}>Post</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps)(Post);