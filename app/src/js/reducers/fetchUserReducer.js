import { handleActions } from 'redux-actions';
import actions from '../actions/fetchUserAction'

const {startFetch, getUser, threwError} = actions;
let initialState = [];
export default handleActions({
        [startFetch]: _ => 'Starts fetching...',
        [getUser]: (state, action) => state.concat(action.payload),
        [threwError]: (state, action) => `Error fetchUserReducer@${action.type}`,
    },
    initialState
);