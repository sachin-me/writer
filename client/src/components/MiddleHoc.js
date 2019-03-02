import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const MiddleHOC = (Component) => (user = props.user) => {
  console.log(user)
  return user ? <Component /> : <Redirect to="/login" /> 
}

const mapStateToProps = (state) => {
  return {
    user: state.user || {}
  }
}

export default connect(mapStateToProps)(MiddleHOC)