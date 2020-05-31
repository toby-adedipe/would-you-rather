import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser} from '../actions/autheduser'
import Select from 'react-select';
import logo from './logo.jpeg';

class Login extends Component{
    state={
        autheduser:''
    }

    handleChange= (selectedOption)=>{
        this.setState(()=>({
            autheduser: selectedOption.value
        }))
    }
    handleSubmit= (e)=>{
        e.preventDefault();
        const { dispatch } =  this.props
        dispatch(setAuthedUser(this.state.autheduser))
    }

    render(){
        const options = [
            { value: 'toby_adedipe', label: 'Adedipe Oluwatobi'},
            { value: 'joy_bawor', label: 'Bawor Joy'},
            { value: 'mary_poppins', label: 'Mary Poppins'}
        ]

        return(
            <div>
                <div className='login-tab'>
                    <h2 className='login-header'>Would You Rather</h2>
                    <img
                        src={logo}
                        alt="logo"
                        className='logo'
                    />
                    <h4 className='login-header'>Pick a user and sign in to play</h4>
                    <form onSubmit={this.handleSubmit}>
                        <Select 
                            options = {options} 
                            onChange= { this.handleChange}
                            className='select'
                        />
                        <button type='submit' className='login-btn' disabled={this.state.autheduser.length === 0}>Log In</button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps( { setAuthedUser }){
    return {
        setAuthedUser
    }
}

export default connect(mapStateToProps)(Login)