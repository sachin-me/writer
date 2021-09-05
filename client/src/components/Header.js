import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="header">
        <div className="header-logo">
          <Link to={`/`}>Writer</Link>
        </div>
        <div className="hero">
          {user._id ? (
            <Fragment>
              <div title="create new post" className="newPost-wrapper">
                <Link to="/newPost">Create Post</Link>
              </div>
              <div className="username">
                <Link to="/profile">
                  {`${user.name?.split(" ")?.[0]}`}
                </Link>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="signup-wrapper">
                <Link to="/signup">Sign Up</Link>
              </div>
              <div className="login-wrapper">
                <Link to="/login">Log In</Link>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Header);
