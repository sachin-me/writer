import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { getSinglePost } from '../actions';

class SinglePost extends Component {

  componentDidMount = () => {
    this.props.dispatch(getSinglePost(this.props.match.params.id))
  }

  render() {
    const { singlePost } = this.props;
    return (
      <div className="singlePost-wrapper">
        <div className="singlePost">
          <div>
            <h3>{singlePost.title}</h3>
            <p>{singlePost.bodyName}</p>
            <p>{singlePost.description}</p>
          </div>
          <div className="editPost-btn">
            <Link to={`/post/${singlePost._id}/edit`}>Edit</Link>
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

export default connect(mapStateToProps)(SinglePost)