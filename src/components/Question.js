import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSaveAnswer } from '../actions/answers';
import voted from './voted.jpg'

class Question extends Component{
    state={
        value: ''
    }
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    }

    render(){
        const { id, users, questions, authedUser } = this.props;

        let totalVotes = questions[id].firstOption.votes.length +  questions[id].secondOption.votes.length
        let firstOptionVotes = questions[id].firstOption.votes.length
        let secondOptionVotes = questions[id].secondOption.votes.length
        let firstPercentage = ((firstOptionVotes/totalVotes)*100)
        let secondPercentage = 100-firstPercentage

        return(
            <div>
                <h3 className="question-header">{users[questions[id].askedBy].name} wants to know</h3>
                <div className="question">
                    <div className="question-image-section">
                        <img
                            src={users[questions[id].askedBy].avatar}
                            alt={`${users[questions[id].askedBy].name}'s avatar`}
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
                                    {questions[id].firstOption.text}
                                </label>
                                <label className="question-options">
                                    <input
                                        type='radio'
                                        name='options'
                                        value='secondOption'
                                        onChange={(e)=>this.handleChange(e.target.value)}
                                    />
                                    {questions[id].secondOption.text}
                                </label>
                                <button type="submit" className="primary-btn" disabled={this.state.value.length ===0}>Submit</button>
                            </form>
                    </div>
                </div>

                <div>
                    <div>
                        <h3 className='result-header'>Asked By {users[questions[id].askedBy].name}</h3>
                        <div className='result-div'>
                            <h4 className='result-div-header'>Results</h4>
                            <div className='result'>
                                <div className='result-image-section'>
                                    <img
                                        src={users[questions[id].askedBy].avatar}
                                        alt={`${users[questions[id].askedBy].name}'s avatar`}
                                    />
                                </div>
                                <div className='result-quest-section'>
                                    <div className="firstOption">
                                        <img
                                            src={voted}
                                            alt="voted-icon"
                                            className='voted-icon'
                                        />
                                        <p>{questions[id].firstOption.text}</p>
                                        <p><span>{`${firstPercentage}%`}</span> <span>{`${firstOptionVotes} of ${totalVotes} total votes`}</span></p>
                                    </div>
                                    <div className="secondOption">
                                        <p>{questions[id].secondOption.text}</p>
                                        <p><span>{`${secondPercentage}%`}</span> <span>{`${secondOptionVotes} of ${totalVotes} total votes`}</span></p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ questions, users, authedUser }, props){
    const { id } = props.match.params

    return{
        id,
        users,
        questions,
        authedUser,
    }
}

export default connect(mapStateToProps)(Question);