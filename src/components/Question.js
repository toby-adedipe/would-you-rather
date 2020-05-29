import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveAnswer } from '../utils/api';
class Question extends Component{
    state={
        value: ''
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
        
        
        dispatch(saveAnswer({authedUser, id, answer}))
    }

    render(){
        const { id, users, questions, authedUser } = this.props;
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