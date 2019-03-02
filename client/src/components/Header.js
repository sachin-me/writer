import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Signup from './Signup';
import { logout } from '../actions';


class Header extends Component {

  render() {
    const { user } = this.props;
    return (
      <div className="header">
        <div className="header-logo">
          <Link to={`/`}>
            <p>Writer</p>
          </Link>
        </div>
        <div className="hero">
          {
            (user.id) ? 
            <Fragment>
              <div title="create new post" className="newPost-wrapper">
                <Link to="/newPost">
                  <p>+</p>
                </Link>
              </div> 
              <div className="username">
                <Link to='/profile'>
                  <p title='user'>{`${user.name.split(' ')[0][0]}${user.name.split(' ')[1][0]}`}</p>
                </Link>
              </div>
            </Fragment>
            : 
            <Fragment>
              <div className="signup-wrapper">
                <Link to="/signup">
                  <p>Sign Up</p>
                </Link>
              </div>
              <div className="login-wrapper">
                <Link to="/login">
                  <p>Log In</p>
                </Link>
              </div>
            </Fragment>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    state
  }
}

export default connect(mapStateToProps)(Header)