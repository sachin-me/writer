import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import userAction from "../actions/userAction";
import helperFunctions from "../Utility";
import Message from "./Common/Message";

const { validateEmail, validatePassword } = helperFunctions;

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    validEmail: true,
    validPassword: true,
    message: null,
    error: null,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.validateEmailPassword();
      }
    );
  };

  validateEmailPassword = () => {
    let { email, password, validEmail, validPassword } = this.state;

    this.setState(
      {
        validEmail: validateEmail(email),
        validPassword: validatePassword(password),
      },
      () => {
        if (email || password) {
          if (email && !validEmail) {
            return this.setState({
              error: "*Enter valid email address (e.g. abc@gmail.com)",
            });
          }
          if (password && !validPassword) {
            return this.setState({
              error:
                "*Password must contain 4-8 characters and at least One Uppercase letter and one numeric value.",
            });
          } else {
            return this.setState({
              error: "",
            });
          }
        }
      }
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;

    if (validateEmail(email) && validatePassword(password)) {
      const payload = {
        name,
        email,
        password,
      };
      this.props.dispatch(userAction.create(payload, this.handleSubmitReturn));
    } else {
      this.setState({
        error: "Email or Password is invalid",
      });
    }
  };

  handleSubmitReturn = (success, error) => {
    if (success) {
      this.props.history.push("/login");
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
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email..."
            onChange={(event) => this.handleChange(event)}
            onBlur={this.validateEmailPassword}
          />
          <input
            type="password"
            name="password"
            placeholder="Password..."
            onChange={(event) => this.handleChange(event)}
            onBlur={this.validateEmailPassword}
          />
          <Message message={message} error={error} />
          <div className="btn-wrapper">
            <button>Sign up</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.error,
    message: state.message,
  };
};

export default connect(mapStateToProps)(Signup);
