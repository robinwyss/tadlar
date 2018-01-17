
const parseArtistResult = result => {
    if (result.count === 0) {
        return {};
    } else if (result.count === 1) {
        return lookupArtist(result.artists[0].id).then(data => {
            return { artist: data, exactMatch: true };
        });
    } else {
        var matchingArtists = result.artists.filter(a => parseInt(a.score) > 90);
        if (matchingArtists.length === 0) {
            return { artists: result.artists, exactMatch: false };
        } else if (matchingArtists.length === 1) {
            return lookupArtist(matchingArtists[0].id).then(data => {
                return { artist: data, exactMatch: true };
            });
        } else {
            return { artists: matchingArtists, exactMatch: false };
        }
    }
};

export const searchArtist = name => {
    return fetch('https://musicbrainz.org/ws/2/artist/?query=' + name + '&fmt=json')
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            //console.log(result);
            return parseArtistResult(result);
        })
        .catch(function (err) {
            console.error(err);
        });
};

export const lookupArtist = id => {
    console.log('looking up' + id)
    return fetch('https://musicbrainz.org/ws/2/artist/' + id + '?fmt=json&inc=url-rels+area-rels')
        .then(function (result) {
            return result.json();
        });
};

export const getArea = (areaId) => {
    return fetch('https://musicbrainz.org/ws/2/area/' + areaId +'?fmt=json&inc=area-rels').then(function(response){
       return response.json()
     }).then(function(response){
       console.log('response: '+ JSON.stringify(response))
       var result = {}
       result[response.type] = response.name
       var backRels = response.relations.filter((rel) => rel.direction == 'backward')
       if(backRels.length == 1){
         return getArea(backRels[0].area.id).then((a)=> {
           return {...result, ...a};
         }).catch(function(err) { console.error(err); });
       } else {
         return result;
       }
     }).catch(function(err) { console.error(err); });
 }