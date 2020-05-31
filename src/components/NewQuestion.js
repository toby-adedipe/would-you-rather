import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSaveQuestion } from '../actions/questions'
import { withRouter } from 'react-router-dom';


class NewQuestion extends Component{
    state={
        firstOption:'',
        secondOption:'',
    }

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFirstOptionChange = this.handleFirstOptionChange.bind(this);
        this.handleSecondOptionChange = this.handleSecondOptionChange.bind(this);
    }

    handleFirstOptionChange(e){
        const firstOption = e.target.value

        this.setState(()=>({
            firstOption
        }))
    }

    handleSecondOptionChange(e){
        const secondOption = e.target.value

        this.setState(()=>({
            secondOption
        }))
    }

    handleSubmit(e){
        e.preventDefault();
        const { firstOption, secondOption} = this.state
        const { dispatch, authedUser} = this.props
        dispatch(handleSaveQuestion(authedUser, firstOption, secondOption))
            .then(this.setState({
                firstOption: '',
                secondOption: ''
            }))
            .then(this.props.history.push('/'))
    }


    render(){
        const { firstOption, secondOption } = this.state
        return(
            <div>
                <div>
                    <h3 className='question-header'>Ask your question</h3>
                    <div className='question-div'>
                        <h4 className='question-header'>Would you rather?</h4>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type='text'
                                value={firstOption}
                                onChange={this.handleFirstOptionChange}
                                name='firstOption'
                            />
                            <p>OR</p>
                            <input
                                type='text'
                                value={secondOption}
                                onChange={this.handleSecondOptionChange}
                                name='firstOption'
                            />
                            <button type="submit" className='submit-btn'>Submit</button>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps({authedUser}){
    return{
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(NewQuestion));