import { RECEIVE_USERS } from '../actions/users';
import { SAVE_ANSWER } from '../actions/answers';
import { SAVE_QUESTIONS } from '../actions/questions';

export default function users (state={}, action){
    switch(action.type){
        case RECEIVE_USERS:
            return{
                ...state,
                ...action.users
            }
        case SAVE_QUESTIONS:
            return{
                ...state,
                [action.question.askedBy]:{
                    ...state[action.question.askedBy],
                    created: state[action.question.askedBy].created.concat([action.question.id]) 
                }
            }
        case SAVE_ANSWER:
            return{
                ...state,
                [action.authedUser]:{
                    ...state[action.authedUser],
                    answered : {
                        ...state[action.authedUser].answered,
                        [action.id]: action.answer
                    }
                }
            }
        default:
            return state
    }
}