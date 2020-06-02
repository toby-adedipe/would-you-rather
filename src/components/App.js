import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import '../App.css';
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import Nav from './Nav';
import Dashboard from './Dashboard';
import Question from './Question';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import Login from './Login';
import LoadingBar from 'react-redux-loading';
import ErrorPage from './ErrorPage';

const { authedUser } = this.props

const PrivateRoute=({ component:Component, ...rest})=>(
    <Route {...rest} render={(props)=>(
        authedUser === null
            ? <Redirect component={Login} />
            : <Component { ...props} />
    )} />
)

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData());
  }

  render(){
    const { authedUser } = this.props
    return (
      <Router className="App">
        <Fragment>
          <LoadingBar />
          {this.props.loading
            ? null
            : (authedUser === null)
              ? <Route component={Login}></Route>
              : <div>
                  <Nav />
                  <Switch>
                    <Route path='/' exact component={Dashboard} />
                    <PrivateRoute path='/question/:id' component={Question} />
                    <Route path='/add' component={NewQuestion} />
                    <Route path='/leaderboard' component={Leaderboard} />

                    <Route component={ErrorPage} />
                  </Switch>
                  
                </div>
          }
        </Fragment>
      </Router>
    );
  
  }
}

function mapStateToProps({authedUser, users}){
  return {
    authedUser,
    loading: users === null
  }
}

export default connect(mapStateToProps)(App);
