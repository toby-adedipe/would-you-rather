import React, { Component } from "react";
import {Route, Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import Login from './Login';

const { authedUser } = this.props

const PrivateRoute=({ component:Component, ...rest})=>(
    <Route {...rest} render={(props)=>(
        authedUser === null
            ? <Component { ...props} />
            : <Redirect component={Login} />
    )} />
)

function mapStateToProps({ authedUser }){

    return{
        authedUser
    }
}

export default connect(mapStateToProps)(PrivateRoute);