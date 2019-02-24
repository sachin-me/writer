import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePost, getSinglePost } from '../actions';

class EditPost extends Component {
  state = {
    title: '',
    description: '',
    bodyName: '',
    tags: null
  }

  handleTitle = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleUpdate = (id) => {
    this.props.dispatch(updatePost(this.state, id, (succeed => {
      if (succeed) {
        this.props.history.push(`/post/${id}`)
      }
    })));
    
  }

  componentDidMount = () => {
    const { match, singlePost } = this.props;
    console.log(singlePost);
    this.props.dispatch(getSinglePost(match.params.id));
    this.setState({
      title: singlePost.title,
      description: singlePost.description,
      bodyName: singlePost.bodyName,
      tags: singlePost.tags
    })
  }

  render() {
    const {  title, description, bodyName, tags } = this.state;
    const { singlePost } = this.props;
    return (
      <div className="post-wrapper">
        <div className="postForm-wrapper">
          <input type="text" name="title" value={title} id="" placeholder="Add Title..." onChange={this.handleTitle} />
          <input type="text" name="bodyName" value={bodyName} id="" placeholder="Add body..." onChange={this.handleTitle} />
          <textarea name="description" id="" value={description} placeholder="Add description..." onChange={this.handleTitle}></textarea>
          <input type="text" placeholder="Add Tags..." name="tags" value={tags} onChange={this.handleTitle} />
          <div>
            <button onClick={(id) => this.handleUpdate(singlePost._id)}>Post</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    singlePost: state.singlePost || {}
  }
}

export default connect(mapStateToProps)(EditPost);