import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { getSinglePost } from "../actions";

class SinglePost extends Component {
  state = {
    loading: true,
  };
  componentDidMount = () => {
    this.props.dispatch(
      getSinglePost(this.props.match.params.id, (success) => {
        if (success) {
          this.setState({
            loading: false,
          });
        } else {
          this.setState({
            loading: false,
          });
        }
      })
    );
  };

  render() {
    const { singlePost } = this.props;
    const { loading } = this.state;
    if (loading) {
      return (
        <div className="loader">
          <Loader type="Puff" color="#666" height={100} width={100} />
        </div>
      );
    }
    return (
      <div className="singlePost-wrapper">
        <div className="singlePost">
          <div>
            {singlePost?.title && (
              <>
                <p className="heading">Title:</p>
                <p>{singlePost.title}</p>
              </>
            )}
            {singlePost?.bodyName && (
              <>
                <p className="heading">Sub Text:</p>
                <p>{singlePost.bodyName}</p>
              </>
            )}
            {singlePost?.description && (
              <>
                <p className="heading">Description:</p>
                <p>{singlePost.description}</p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    singlePost: state.singlePost || {},
  };
};

export default connect(mapStateToProps)(SinglePost);
