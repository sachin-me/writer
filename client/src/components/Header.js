import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Signup from './Signup';


class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-logo">
          <Link to={`/`}>
            <p>Writer</p>
          </Link>
        </div>
        <div className="hero">
          <div className="newPost-wrapper">
            <Link to="/newPost">
              <p title="create new post">+</p>
            </Link>
          </div>
          <div className="signup-wrapper">
            <Link to="/signup">
              <p>Sign Up</p>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Header