import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import userAction from "../actions/userAction";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const payload = {
      name,
      email,
      password,
    };
    this.props.dispatch(userAction.create(payload));
  };

  render() {
    return (
      <div className="form-wrapper">
        <div>
          <Link to="/login">
            <p>Already a user Log in?</p>
          </Link>
        </div>
        <form
          action=""
          method="post"
          className="form"
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <input
            type="text"
            name="name"
            placeholder="Full name..."
            onChange={(event) => this.handleChange(event)}
          />
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
          <div className="btn-wrapper">
            <button>Sign up</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(Signup);
