import { spotifyConstants } from '../constants'

export const spotifyActions = {
    updatePlaybackStatus
}

const updatePlaybackStatus = (playbackInfo) => {
    return {
        type: spotifyConstants.PLAYBACK_UPDATE,
        playbackInfo
    };
}