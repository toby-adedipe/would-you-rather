import React, { Component } from 'react';
import { connect } from 'react-redux';

class Leaderboard extends Component {
    render(){
        const { users, questions, userIds } = this.props
        console.log(userIds)
        return(
            <div>
                <div>
                    <h3 className='question-header'>Leaderboard</h3>
                    <div>
                        {userIds.map((id)=>(
                            <div key={id} className='leaderboard-div'>
                                <h4 className='leaderboard-header'>{users[id].name}</h4>
                                <div className='leaderboard-inner'>
                                    <div className='question-image-section'>
                                        <img
                                            src={users[id].avatar}
                                            alt={`${users[id].name}'s avatar`}
                                        />
                                    </div>
                                    <div>
                                        <strong><p>Answered Questions <span>{Object.keys(users[id].answered).length}</span></p></strong>
                                        <strong><p>Questions Created <span>{users[id].created.length}</span></p></strong> 
                                    </div>
                                    <div className='score'>
                                        <strong></strong><p>{(Object.keys(users[id].answered).length)+(users[id].created.length)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users, questions}){
    const userIds = Object.keys(users)
    return{
        users,
        questions,
        userIds
    }
}

export default connect(mapStateToProps)(Leaderboard)