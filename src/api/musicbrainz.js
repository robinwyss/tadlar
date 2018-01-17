
export const searchArtist = (name) => {
    fetch('https://musicbrainz.org/ws/2/artist/?query=' + name + '&fmt=json', )
        .then(function (response) {
            return response.json()
        }).then(function (result) {
            return parseArtistResult(result);
        })
        .then(function (artistResult) {
            if (artistResult.exactMatch) {
                return lookupArtist(data.artist.id)
            } else {
                return data;
            }
        })
        .catch(function (err) { console.error(err); });
}

export const lookupArtist = (id) => {
    fetch('https://musicbrainz.org/ws/2/artist/' + id + '?fmt=json&inc=url-rels&area-rels').then(function (result) {
        return result.json();
    }).then(function (artistData) {
        return { artist: artistData, exactMatch: true }
    });
}

export const areaLookup = (id) => {

}