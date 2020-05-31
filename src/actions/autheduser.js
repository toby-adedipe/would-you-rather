import { showLoading, hideLoading } from "react-redux-loading";

export const SET_AUTHED_USER = 'SET_AUTHED_USER';

function addAuthedUser (id){
    return {
        type: SET_AUTHED_USER,
        id,
    }
}

export function setAuthedUser (authedUser){
    return (dispatch)=>{
        dispatch (showLoading())
        setTimeout(()=>{
            dispatch(addAuthedUser(authedUser))
            dispatch(hideLoading())
        }, 1000)
    }
}