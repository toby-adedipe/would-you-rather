import React, { Component } from 'react';
import { connect } from 'react-redux';

class Leaderboard extends Component {
    render(){
        const { userIds } = this.props
        return(
            <div>
                <div>
                    <h3 className='question-header'>Leaderboard</h3>
                    <div>
                        {userIds.map((user)=>(
                            <div key={user.id} className='leaderboard-div'>
                                <h4 className='leaderboard-header'>{user.name}</h4>
                                <div className='leaderboard-inner'>
                                    <div className='question-image-section'>
                                        <img
                                            src={user.avatar}
                                            alt={`${user.name}'s avatar`}
                                        />
                                    </div>
                                    <div>
                                        <strong><p>Answered Questions <span>{user.questionsAnswered}</span></p></strong>
                                        <strong><p>Questions Created <span>{user.questionsCreated}</span></p></strong> 
                                    </div>
                                    <div className='score'>
                                        <strong></strong><p>{user.total}</p>
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

function mapStateToProps({ users }){

    const userIds = Object.values(users).map(user=>({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        questionsAnswered: Object.keys(user.answered).length,
        questionsCreated: user.created.length,
        total: Object.keys(user.answered).length + user.created.length
    })).sort((a, b)=> b.total - a.total)

    return{
        userIds
    }
}

export default connect(mapStateToProps)(Leaderboard)