import axios from 'axios';

export const REQUEST_FROM_API = 'REQUEST_FROM_API';
export const RECEIVE_FROM_API = 'RECEIVE_FROM_API';
export const SELECT_API = 'SELECT_API';

const API_URL = 'https://swapi.co/api/';
// const API_URL = 'http://localhost:4000/'; // Mock API url


export function selectAPI(apiName) {
    return {
        type: SELECT_API,
        apiName,
    };
}

export function requestAPI(apiName) {
    return {
        type: REQUEST_FROM_API,
        apiName,
    };
}

export function receiveAPI(apiName, data) {
    return {
        type: RECEIVE_FROM_API,
        apiName,
        data,
    };
}

function recurseFetchApi(apiName, pageNumber, apiData = []) {
    return axios.get(`${API_URL}${apiName}?page=${pageNumber}`)
        .then((res) => res.data)
        .then((res) => {
            apiData.push(...res.results);
            if (!res.next) return apiData;
            return recurseFetchApi(apiName, pageNumber + 1, apiData);
        });
}

function fetchFromApi(apiName) {
    return (dispatch) => {
        dispatch(requestAPI(apiName));
        return recurseFetchApi(apiName, 1)
            .then((data) => dispatch(receiveAPI(apiName, data)));
    };
}

function shouldFetchFromApi(state, apiName) {
    return !(state.dataByApi[apiName] && state.dataByApi[apiName].data.length);
}

export function fetchFromApiIfNeeded(apiName) {
    return (dispatch, getState) => {
        if (shouldFetchFromApi(getState(), apiName)) {
            return dispatch(fetchFromApi(apiName));
        }
        return null;
    };
}
