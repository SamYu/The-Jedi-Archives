import { combineReducers } from 'redux';
import { REQUEST_FROM_API, RECEIVE_FROM_API, SELECT_API } from '../actions/apiActions';

function selectedApi(state = 'vehicles', action) {
    switch (action.type) {
    case SELECT_API:
        return action.apiName;
    default:
        return state;
    }
}

function apiData(
    state = {
        isFetching: true,
        data: [],
    },
    action,
) {
    switch (action.type) {
    case REQUEST_FROM_API:
        return {
            isFetching: true,
            ...state,
        };
    case RECEIVE_FROM_API:
        return {
            ...state,
            isFetching: false,
            data: action.data,
        };
    default:
        return state;
    }
}

function dataByApi(state = {}, action) {
    switch (action.type) {
    case REQUEST_FROM_API:
    case RECEIVE_FROM_API:
        return {
            ...state,
            [action.apiName]: apiData(state[action.apiName], action),
        };
    default:
        return state;
    }
}

export default combineReducers({
    dataByApi,
    selectedApi,
});
