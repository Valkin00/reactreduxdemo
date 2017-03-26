import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
    AUTH_USER, 
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MARKERS,
    ADD_MARKER,
    REMOVE_MARKER,
    SAVE_MARKERS
} from './types';

const ROOT_URL = 'http://localhost:5000';

export function signinUser({ email, password }){
    return function(dispatch){
        // submit email/password to the server
        var encoded = window.btoa(`${email}:${password}`);
        axios.post(`${ROOT_URL}/users/signin`, {
            headers: { 'authorization': `Basic ${encoded}` }
        })
            .then(response => {
                // if request is good...
                // -Update state to indicate user is authenticated
                dispatch({ 
                    type: AUTH_USER,
                    payload: response.data 
                });
                browserHistory.push('/main');
            })
            .catch(() => {
                dispatch(authError('Bad Login Info'));
            });
    }
    
}

export function signupUser({email, password}){
    return function(dispatch){
        var encoded = window.btoa(`${email}:${password}`);
        axios.post(`${ROOT_URL}/users/signup`, {
            headers: { 'authorization': `Basic ${encoded}` }
        })
            .then(respone => {
                dispatch({ 
                    type: AUTH_USER,
                    payload: response.data 
                });
                browserHistory.push('/main');
            })
            .catch(response => dispatch(authError('Email is already taken')))

    }
}


export function authError(error){
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signoutUser(){
    return{ type: UNAUTH_USER }
}



///// MARKER CODE
export function addMarker(marker){
    return {
        type: ADD_MARKER,
        payload: marker
    }
}
export function removeMarker(marker){
    return {
        type: REMOVE_MARKER,
        payload: marker
    }
}

export function saveMarkers(markers, userId){
    var message = '';
    const request = axios.post(`${ROOT_URL}/users/${userId}/markers`, {markers})

    return{
        type: SAVE_MARKERS,
        payload: request
    }
    
}