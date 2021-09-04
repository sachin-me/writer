import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import userAction from "../actions/userAction";
import Message from "./Common/Message";

class Login extends Component {
  state = {
    email: "",
    password: "",
    message: null,
    error: null,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    const payload = {
      email,
      password,
    };

    this.props.dispatch(userAction.loginUser(payload, this.handleSubmitReturn));
  };

  handleSubmitReturn = (success, error) => {
    if (success) {
      this.props.history.push("/");
    } else {
      this.setState({
        error: error,
      });
    }
  };

  render() {
    const { message, error } = this.state;

    return (
      <div className="form-wrapper">
        <div>
          <Link to="/signup">
            <p>Need an account Sign up?</p>
          </Link>
        </div>
        <form
          action=""
          method="post"
          className="form"
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <input
            type="email"
            name="email"
            placeholder="Email..."
            onChange={(event) => this.handleChange(event)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password..."
            onChange={(event) => this.handleChange(event)}
          />
          <Message message={message} error={error} />
          <div className="btn-wrapper">
            <button>Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null)(Login);
