import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { logout } from '../actions';


class Profile extends Component {
  handleClick = () => {
    this.props.dispatch(logout(succeed => {
      if (succeed) {
        this.props.history.push(`/`)
      }
    }))
  }

  render() {
    const { user } = this.props;
    return (
      <div className="profile-wrapper">
        <button onClick={
          () => (
            (user.id) ? this.handleClick() : <Redirect to='/login' />
          )
        }>Click here to Logout</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Profile);