import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { setAuthedUser } from '../actions/autheduser';

class Nav extends (Component){
    handleClick = (e)=>{
        const { dispatch } = this.props
        e.preventDefault()

        dispatch(setAuthedUser(null));

        this.props.history.push('/')
    }

    render(){
        const { authedUser, users } = this.props;

        return(
            <div className='nav-container'>
                <input type="checkbox" id="toggler" />
                <div className="hamburger"><div></div></div>
                <div className="sidebar">
                    <div className='sidebar-links'>
                        <Link to='/'>Home</Link>
                        <Link to='/add'>New Poll</Link>
                        <Link to='/leaderboard'>Leaderboard</Link>
                    </div>
                </div>
                <div className="overlay"></div>
                <div className='navbar'>
                    <div className='nav-links'>
                        <Link to='/'>Home</Link>
                        <Link to='/add'>New Poll</Link>
                        <Link to='/leaderboard'>Leaderboard</Link>
                    </div>
                    <div className='user-info'>
                        <img
                            src={users[authedUser].avatar}
                            alt={`avatar for ${users[authedUser].avatar}`}
                            className='nav-avatar'
                        />
                        <p>{users[authedUser].name}</p>
                        <button className='sign-out' onClick={this.handleClick}>Sign out</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users }){

    return{
        authedUser,
        users
    }
}

export default withRouter(connect(mapStateToProps)(Nav))