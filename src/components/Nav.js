import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Nav extends (Component){
    render(){
        const { authedUser, users } = this.props;
        console.log(authedUser, users)

        return(
            <div className='nav-container'>
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
                        <button className='sign-out'>Sign out</button>
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

export default connect(mapStateToProps)(Nav)