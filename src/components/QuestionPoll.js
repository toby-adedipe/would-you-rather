import React, { Component } from 'react';
import { handleSaveAnswer } from '../actions/answers';
import voted from './voted.svg'
import Footer from './Footer';

import { connect } from 'react-redux';

class QuestionPoll extends Component{
    state={
        value: '',
        hasVoted: false
    }
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.hasVoted()
    }

    handleChange(value){
        this.setState(()=>({
            value
        }))
    }

    handleSubmit(e){
        e.preventDefault()
        const { dispatch, authedUser, id } = this.props
        const answer = this.state.value
        
        dispatch(handleSaveAnswer({authedUser, id, answer}))
        this.setState(()=>({
            hasVoted: true
        }))
    }

    hasVoted(){
        const { authedUser, question } = this.props

        question.firstOption.votes.includes(authedUser) || question.secondOption.votes.includes(authedUser)
            ? this.setState(()=>({
                hasVoted: true
            }))
            : this.setState(()=>({
                hasVoted: false
            }))
    }

    render(){
        const {
            users, 
            question,
            authedUser,} = this.props;

        const totalVotes = question.firstOption.votes.length +  question.secondOption.votes.length
        const firstOptionVotes = question.firstOption.votes.length
        const secondOptionVotes = question.secondOption.votes.length
        const firstPercentage = firstOptionVotes === 0 
                                ? 0
                                : Math.round((firstOptionVotes/totalVotes)*100)
        const secondPercentage = secondOptionVotes === 0 
                                ? 0
                                : Math.round((secondOptionVotes/totalVotes)*100)
    
        const votedFirstOption = question.firstOption.votes.includes(authedUser)
        const votedSecondOption = question.secondOption.votes.includes(authedUser)

        return(
                <div>
                                { !this.state.hasVoted && (
                    <div>
                        <h3 className="question-header">{users[question.askedBy].name} wants to know</h3>
                        <div className="question">
                            <div className="question-image-section">
                                <img
                                    src={users[question.askedBy].avatar}
                                    alt={`${users[question.askedBy].name}'s avatar`}
                                />
                            </div>
                            <div className="question-quest-section">
                                <h4>Would you Rather?</h4>
                                <form onSubmit={this.handleSubmit}>
                                    <label className="question-options">
                                        <input
                                            type='radio'
                                            name='options'
                                            value='firstOption'
                                            onChange={(e)=>this.handleChange(e.target.value)}
                                        />
                                        {question.firstOption.text}
                                    </label>
                                    <label className="question-options">
                                        <input
                                            type='radio'
                                            name='options'
                                            value='secondOption'
                                            onChange={(e)=>this.handleChange(e.target.value)}
                                        />
                                        {question.secondOption.text}
                                    </label>
                                    <button type="submit" className="primary-btn" disabled={this.state.value.length ===0}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                { this.state.hasVoted && (
                    <div>
                        <div>
                            <h3 className='result-header'>Asked By {users[question.askedBy].name}</h3>
                            <div className='result-div'>
                                <h4 className='result-div-header'>Results</h4>
                                <div className='result'>
                                    <div className='result-image-section'>
                                            <img
                                            src={users[question.askedBy].avatar}
                                            alt={`${users[question.askedBy].name}'s avatar`}
                                        />
                                    </div>
                                    <div className='result-quest-section'>
                                        <div className={votedFirstOption? 'voted' : 'firstOption'}>
                                            <img
                                                src={voted}
                                                alt="voted-icon"
                                                className={votedFirstOption ? 'voted-icon' : 'voted-icon-hidden'}
                                            />
                                            <p>{question.firstOption.text}</p>
                                            <p><span>{`${firstPercentage}%`}</span> <span>{`${firstOptionVotes} of ${totalVotes} total votes`}</span></p>
                                        </div>
                                        <div className={votedSecondOption ? 'voted' : 'secondOption'}>
                                            <img
                                                src={voted}
                                                alt="voted-icon"
                                                className={votedSecondOption ? 'voted-icon' : 'voted-icon-hidden'}
                                            />
                                            <p>{question.secondOption.text}</p>
                                            <p><span>{`${secondPercentage}%`}</span> <span>{`${secondOptionVotes} of ${totalVotes} total votes`}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                { this.state.hasVoted && <Footer /> }

            </div>
        )
    }
}

export default connect()(QuestionPoll)