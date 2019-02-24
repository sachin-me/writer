import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  render() {
    return (
      <div className="form-wrapper">
        <div>
          <Link to="/signup">
            <p>Need an account Sign up?</p>
          </Link>
        </div>
        <form action="" method="post" className="form">
          <input type="email" name="email" placeholder="Email..." />
          <input type="password" name="password" placeholder="Password..." />
          <div className="btn-wrapper">
            <button>Login</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login