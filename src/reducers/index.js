import { combineReducers } from 'redux';
import { authentication } from './auth.reducer'
import { spotify  } from './spotify.reducers'

export default {
    authentication, 
    spotify
};
