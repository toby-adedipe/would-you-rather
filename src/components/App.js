import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../App.css';
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import Nav from './Nav';
import Dashboard from './Dashboard';
import Question from './Question';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import { LoadingBar } from 'react-redux-loading';

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData());
  }

  render(){
    const { authedUser } = this.props
    return (
      <Router className="App">
        {this.props.loading
          ? null
          : (authedUser === null)
            ? null
            : <div>
                <Nav />
                <LoadingBar />
                <Route path='/' exact component={Dashboard} />
                <Route path='/question/:id' component={Question} />
                <Route path='/add' component={NewQuestion} />
                <Route path='/leaderboard' component={Leaderboard} />
              </div>
        }
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
