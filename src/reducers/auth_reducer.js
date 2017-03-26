import { 
    AUTH_USER, 
    UNAUTH_USER, 
    AUTH_ERROR, 
    FETCH_MARKERS ,
    ADD_MARKER,
    REMOVE_MARKER,
    SAVE_MARKERS
} from '../actions/types';

export default function(state = {}, action){
    switch (action.type) {
        case AUTH_USER:
            return { ...state, error: '', authenticated: true, userId: action.payload.userId, markers: action.payload.markers };
        case UNAUTH_USER:
            return { ...state, message: '', authenticated: false };
        case AUTH_ERROR:
            return { ...state, error: action.payload };
        case FETCH_MARKERS:
            return { ...state, markers: action.payload.markers, userId: action.payload._id };
        
        
        case ADD_MARKER:
            return {...state, markers: [...state.markers, action.payload] };
        case REMOVE_MARKER:
            var newMarkers = state.markers.slice();
            var ind = -1;
            for (let i = 0; i < newMarkers.length; i++)
            {
                if(newMarkers[i].lat == action.payload.lat && newMarkers[i].lng == action.payload.lng)
                {
                    ind = i;
                    break;
                }
            }
            if(ind !== -1)
            {
                newMarkers.splice(ind,1);
            }
            return {...state, markers: newMarkers};
        case SAVE_MARKERS:
            return {...state, message: action.payload.data.message};    
    }
    return state;
}