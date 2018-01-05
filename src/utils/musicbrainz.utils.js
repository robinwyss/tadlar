export const parseArtistResult = (data) => {
    if (result.count === 0) {
        throw "No artist found"
    } else if (result.count === 1) {
        return { artist: result.artists[0], exactMatch: true };
    } else {
        var matchingArtists = result.artists.filter(a => a.score === '100');
        if (matchingArtists.length === 0) {
            return { artists: result.artists, exactMatch: false }
        } else if (matchingArtists.length === 1) {
            return { artist: matchingArtists[0], exactMatch: true };
        } else {
            return { artists: matchingArtists[0], exactMatch: false }
        }
    }
}