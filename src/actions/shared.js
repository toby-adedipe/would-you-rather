import { getInitialData } from '../utils/api';
import { showLoading, hideLoading} from 'react-redux-loading';
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
import { setAuthedUser } from './autheduser';

const AUTHED_ID = 'toby_adedipe';

export function handleInitialData (){
    return (dispatch) =>{
        dispatch(showLoading())
        return getInitialData()
            .then(({users, questions})=>{
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
                dispatch(setAuthedUser(AUTHED_ID));
                dispatch(hideLoading());
            })
    }
}