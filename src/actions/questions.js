import { saveQuestion } from '../utils/api';
import { showLoading, hideLoading} from 'react-redux-loading';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS'


export function receiveQuestions(questions){
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function saveQuestionAction(question){
    return {
        type: SAVE_QUESTIONS,
        question,
    }
}

export function handleSaveQuestion(askedBy, firstOption, secondOption){
    return (dispatch)=>{
        dispatch(showLoading())
        return saveQuestion({askedBy, firstOption, secondOption})
            .then((question)=>dispatch(saveQuestionAction(question)))
            .then(()=>dispatch(hideLoading()))
    }
}