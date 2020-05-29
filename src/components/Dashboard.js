import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashBoard extends Component{
    render(){
        const { questions, answered, unanswered } = this.props;
        console.log(questions);
        console.log(answered);
        console.log(unanswered);
        return(
            <div className='dashboard'>
                <h2>Unanswered</h2>
                {unanswered.map((id)=>(
                    <div key={id}>
                        <div>
                            <p>{questions[id].askedBy} wants to know</p>
                        </div>
                        <div>
                            <h4>Would you rather?</h4>
                            <p>{questions[id].firstOption}</p>
                            <p>{questions[id].secondOption}</p>
                        </div>
                    </div>
                    
                ))}
                <h2>Answered</h2>
                {answered.map((id)=>(
                    <p>{id}</p>
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
        questions,
        answered,
        authedUser,
        unanswered
    }
}
export default connect(mapStateToProps)(DashBoard);