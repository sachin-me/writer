import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Signup extends Component {

  state = {
    email: '',
    password: ''
  }

  render() {
    return (
      <div className="form-wrapper">
        <div>
          <Link to="/login">
            <p>Already a user Log in?</p>
          </Link>
        </div>
        <form action="" method="post" className="form">
          <input type="text" name="name" placeholder="Full name..." />
          <input type="email" name="email" placeholder="Email..." />
          <input type="password" name="password" placeholder="Password..." />
          <div className="btn-wrapper">
            <button>Sign up</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Signup