import { spotifyConstants } from '../constants'

const updatePlaybackStatus = (playbackInfo) => {
    return {
        type: spotifyConstants.PLAYBACK_UPDATE,
        playbackInfo
    };
}

export const spotifyActions = {
    updatePlaybackStatus: updatePlaybackStatus
}