import { createActions } from 'redux-actions';
const { start, get, error } = createActions('START', 'GET', 'ERROR');
export default {
    startFetch: start,
    getUser: get,
    threwError: error,
}