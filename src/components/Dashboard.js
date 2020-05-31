import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class DashBoard extends Component{
    render(){
        const { questions, answered, unanswered, users } = this.props;

        return(
            <div className='dashboard tabs'>
                <input type='radio' id='unanswered' name='tab-group' checked />
                <label htmlFor='unanswered'>UNANSWERED</label>
                <input type='radio' id='answered' name='tab-group' />
                <label htmlFor='answered'>ANSWERED</label>
                <div className='tab unanswered-content'>
                    <div className='content'>
                        {unanswered.map((id)=>(
                            <div key={id} className="poll">
                                <div className="poll-image-section">
                                    <h4>{users[questions[id].askedBy].name} wants to know</h4>
                                    <img 
                                        src={users[questions[id].askedBy].avatar} 
                                        alt={`${users[questions[id].askedBy].name}'s avatar`} 
                                    />
                                </div>
                                <div className="poll-quest-section">
                                    <h4>Would you rather?</h4>
                                    <p>{questions[id].firstOption.text}</p>
                                    <p> OR </p>
                                    <p>{questions[id].secondOption.text}</p>
                                    <Link to={`/question/${id}`}><button className="primary-btn">Answer poll</button></Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='tab answered-content'>
                    <div className='content'>
                        {answered.map((id)=>(
                            <div key={id} className="poll">
                                <div className="poll-image-section">
                                    <h4>{users[questions[id].askedBy].name} wants to know</h4>
                                    <img 
                                        src={users[questions[id].askedBy].avatar} 
                                        alt={`${users[questions[id].askedBy].name}'s avatar`} 
                                    />
                                </div>
                                <div className="poll-quest-section">
                                    <h4>Would you rather?</h4>
                                    <p>{questions[id].firstOption.text}</p>
                                    <p> OR </p>
                                    <p>{questions[id].secondOption.text}</p>
                                    <Link to={`/question/${id}`}><button className="primary-btn">View Answer</button></Link>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                </div>
                
                
            </div>
        )
    }
}
function mapStateToProps ({questions, users, authedUser}){
    let answered = Object.keys(users[authedUser].answered)

    let unanswered = Object.keys(questions).filter((id)=>(
        !answered.includes(id)
    ))

    return{
        users,
        questions,
        answered,
        authedUser,
        unanswered
    }
}
export default connect(mapStateToProps)(DashBoard);