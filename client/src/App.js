import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import "./App.scss";
import Header from "./components/Header.js";
import SinglePost from "./components/SinglePost";
import EditPost from "./components/EditPost";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Post from "./components/Post";
import MainContent from "./components/MainContent";
import Profile from "./components/Profile";
import { connect } from "react-redux";
import userAction from "./actions/userAction";

class App extends Component {
  componentDidMount = () => {
    this.props.dispatch(userAction.loggedInUser());
  };
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={MainContent} />
            <Route path="/newPost" component={Post}></Route>
            <Route path="/post/:id" exact component={SinglePost}></Route>
            <Route path="/post/:id/edit" component={EditPost}></Route>
            <Route path="/signup" component={Signup}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/profile" component={Profile}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(null)(App);
