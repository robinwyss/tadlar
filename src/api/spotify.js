


export const getCurrentlyPlaying = (token) => {
    var headers = new Headers();
    headers.append("Authorization", "Bearer " + token);
    return fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers
    }).then((response) => {
        if (response.ok) {
            if(response.status === 204){
                return {};
            } else {
                return response.json();
            }
        } else if (response.status === 401) {
            window.location = '/';
        } else {
            throw "An error occured"; // TODO: better error handling 
        }
    });
}
