import { RECEIVE_QUESTIONS, SAVE_QUESTIONS } from '../actions/questions';
import { SAVE_ANSWER } from '../actions/answers';

export default function questions (state={}, action){
    switch(action.type){
        case RECEIVE_QUESTIONS:
            return{
                ...state,
                ...action.questions
            }
        case SAVE_QUESTIONS:
            return{
                ...state,
                [action.question.id]: action.question
            }
        case SAVE_ANSWER:
            return{
                ...state,
                [action.id]: {
                    ...state[action.id],
                    [action.answer]: {
                        ...state[action.id][action.answer],
                        votes: state[action.id][action.answer].votes.concat([action.authedUser])
                    }
                }
            }
        default:
            return state
    }
}