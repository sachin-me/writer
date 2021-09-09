import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import userAction from "../actions/userAction";

class Profile extends Component {
  handleClick = () => {
    this.props.dispatch(
      userAction.logout((succeed) => {
        if (succeed) {
          window.location.href = "/";
        }
      })
    );
  };

  render() {
    const { user } = this.props;
    return (
      <div className="profile-wrapper">
        <button
          onClick={() =>
            user._id ? this.handleClick() : <Redirect to="/login" />
          }
        >
          Click here to Logout
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Profile);
