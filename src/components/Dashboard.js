import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashBoard extends Component{
    render(){
        const { questions, answered, unanswered, users } = this.props;
        console.log(questions);
        console.log(answered);
        console.log(unanswered);
        return(
            <div className='dashboard'>
                <h2>Unanswered</h2>
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
                            <p>{questions[id].firstOption}</p>
                            <p> OR </p>
                            <p>{questions[id].secondOption}</p>
                            <button className="poll-btn">Answer poll</button>
                        </div>
                        
                    </div>
                    
                ))}
                <h2>Answered</h2>
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
                            <p>{questions[id].firstOption}</p>
                            <p> OR </p>
                            <p>{questions[id].secondOption}</p>
                            <button className="poll-btn">Answer poll</button>
                        </div>
                        
                    </div>
                ))}
                
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