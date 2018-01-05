import { spotifyConstants } from '../constants';

export function spotify(state = {}, action) {
    switch (action.type) {
        case spotifyConstants.PLAYBACK_UPDATE:
            return Object.assign({}, state, {
                playbackInfo: action.playbackInfo
            });
        default:
            return state;
    }
}