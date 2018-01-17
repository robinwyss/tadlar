import { spotifyConstants } from '../constants'
import { getCurrentlyPlaying } from '../api/spotify'

const updatePlaybackStatus = (playbackInfo) => {
    return {
        type: spotifyConstants.PLAYBACK_UPDATE,
        playbackInfo
    };
}

export const spotifyActions = {
    updatePlaybackStatus: updatePlaybackStatus
}