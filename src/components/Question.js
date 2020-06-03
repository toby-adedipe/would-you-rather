import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import QuestionPoll from './QuestionPoll';

class Question extends Component{

    render(){

        const {
            id,
            users, 
            question,
            authedUser,} = this.props;

        if (this.props.isWrongID){
            return <Redirect to='/not-found' />      
        }
        
        return(
            <div>
                <QuestionPoll id={id} users={users} question={question} authedUser={authedUser}/>
            </div>
        )
                
    }
}

function mapStateToProps({ questions, users, authedUser }, props){
    const { id } = props.match.params

    const question = questions[id]
    if (typeof question === 'undefined' ) {
        return {
            isWrongID: true
        }
    }

    return{
        id,
        users,
        question: question ? question : null,
        authedUser,
    }
}

export default connect(mapStateToProps)(Question);